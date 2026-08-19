<#
  Comprime las fotos nuevas que dejes en assets/img/.

  Reemplaza al viejo script de Node + sharp: esta máquina no tiene Node, así
  que la conversión va con .NET (WIC), que en Windows 11 lee PNG, HEIC y WebP.

  Qué hace:
    · Reescala a 2400 px de lado mayor (no agranda las que ya son menores).
    · Convierte a JPEG de calidad 82.
    · Borra el original sólo si la conversión salió bien.
    · Los .jpg que ya existen los deja intactos, así que puedes ejecutarlo
      cuantas veces quieras.

  Uso:
    powershell -ExecutionPolicy Bypass -File optimizar-imagenes.ps1
    powershell -ExecutionPolicy Bypass -File optimizar-imagenes.ps1 -Carpeta otra\ruta -LadoMayor 1800
#>
param(
  [string]$Carpeta = (Join-Path $PSScriptRoot "assets\img"),
  [int]$LadoMayor = 2400,
  [int]$Calidad = 82
)

Add-Type -AssemblyName PresentationCore

if (-not (Test-Path $Carpeta)) {
  Write-Host "No existe la carpeta: $Carpeta" -ForegroundColor Red
  exit 1
}

$entradas = Get-ChildItem -Path $Carpeta -File |
            Where-Object { $_.Extension -match '^\.(png|heic|heif|webp|bmp|tif|tiff)$' }

if ($entradas.Count -eq 0) {
  Write-Host "No hay nada que convertir en $Carpeta (los .jpg se dejan como están)."
  exit 0
}

$ahorroTotal = 0

foreach ($archivo in $entradas) {
  $destino = [System.IO.Path]::ChangeExtension($archivo.FullName, ".jpg")

  if (Test-Path $destino) {
    Write-Host "· $($archivo.Name) — ya existe el .jpg, se omite" -ForegroundColor DarkGray
    continue
  }

  try {
    $flujo = [System.IO.File]::OpenRead($archivo.FullName)
    $decodificador = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
      $flujo,
      [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat,
      [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
    $cuadro = $decodificador.Frames[0]
    $flujo.Close()

    $ancho = $cuadro.PixelWidth
    $alto  = $cuadro.PixelHeight
    $mayor = [Math]::Max($ancho, $alto)

    $imagen = $cuadro
    if ($mayor -gt $LadoMayor) {
      $factor = $LadoMayor / $mayor
      $escala = New-Object System.Windows.Media.ScaleTransform($factor, $factor)
      $imagen = New-Object System.Windows.Media.Imaging.TransformedBitmap($cuadro, $escala)
    }

    $codificador = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
    $codificador.QualityLevel = $Calidad
    $codificador.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($imagen))

    $salida = [System.IO.File]::Open($destino, [System.IO.FileMode]::Create)
    $codificador.Save($salida)
    $salida.Close()

    $antes   = $archivo.Length
    $despues = (Get-Item $destino).Length
    $ahorroTotal += ($antes - $despues)

    Remove-Item $archivo.FullName -Force

    $pct = [Math]::Round((1 - $despues / $antes) * 100)
    "{0,-28} {1,7:N0} KB -> {2,6:N0} KB  ({3}% menos)  {4}x{5}" -f `
      $archivo.Name, ($antes / 1KB), ($despues / 1KB), $pct, $imagen.PixelWidth, $imagen.PixelHeight | Write-Host
  }
  catch {
    Write-Host "! $($archivo.Name) — falló: $($_.Exception.Message)" -ForegroundColor Red
    if (Test-Path $destino) { Remove-Item $destino -Force }
  }
}

if ($ahorroTotal -gt 0) {
  Write-Host ""
  Write-Host ("Ahorro total: {0:N1} MB" -f ($ahorroTotal / 1MB)) -ForegroundColor Green
  Write-Host "Acuérdate de cambiar la ruta .png por .jpg donde corresponda en index.html."
}
