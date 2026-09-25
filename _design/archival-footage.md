# Archival hero footage

These are short, silent excerpts of historical NASA footage, locally encoded
as H.264 MP4 with poster frames. They are decorative editorial backgrounds,
with visible NASA credits linking to the original records.

## Apollo 11 launch, July 16, 1969

- Source: https://science.nasa.gov/resource/apollo-11-launch/
- Original: https://assets.science.nasa.gov/content/dam/science/psd/lunar-science/2023/09/NHQ_07_16_1969_Apollo_11_Launch_HD__No_Audio__orig.mp4
- Local files: `public/video/apollo-launch.mp4`, `public/video/apollo-launch.jpg`
- Excerpt: 70–88 seconds. Silent, pillarboxes removed, 960px wide, 24fps.

### Interpolated slow motion for all heroes

All video heroes use `public/video/<basename>-slow.mp4`, with half-speed
motion baked into the file at 24fps. Browser playback stays at rate 1.
The original clips and posters remain available for comparison and rollback.
The approved Portfolio launch treatment is applied to all eight clips.

Generated with the installed FFmpeg motion-compensated `minterpolate` filter,
which estimates intermediate frames instead of simply repeating frames.
Reproduce from the repository root:

```powershell
Get-ChildItem public/video/*.mp4 | Where-Object { $_.BaseName -notmatch '-slow$' } | ForEach-Object {
  $durationText = & ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $_.FullName
  $duration = ([double]::Parse($durationText, [cultureinfo]::InvariantCulture) * 2).ToString([cultureinfo]::InvariantCulture)
  $outputPath = Join-Path $_.DirectoryName ($_.BaseName + '-slow.mp4')
  & ffmpeg -hide_banner -nostdin -y -i $_.FullName -an -vf "setpts=2*(PTS-STARTPTS),minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,tpad=stop_mode=clone:stop_duration=0.2" -t $duration -c:v libx264 -threads 2 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart $outputPath
  if ($LASTEXITCODE -ne 0) { throw "Encoding failed: $($_.Name)" }
}
```

The short end padding partially compensates for the interpolation filter's lookahead.
The results are approximately 32 seconds for the 16-second excerpts and
36 seconds for the 18-second excerpts. Review moving edges, people, and smoke
during playback for interpolation artifacts.
Filter reference: https://ffmpeg.org/ffmpeg-filters.html#minterpolate

## Apollo 11 mission-control film rolls, 1969

- Source: https://images.nasa.gov/details/KSC-19690716-MH-NAS01-0001-Apollo_11_Mission_Control_Center_Film_Rolls1
- Original rendition: https://images-assets.nasa.gov/video/KSC-19690716-MH-NAS01-0001-Apollo_11_Mission_Control_Center_Film_Rolls1/KSC-19690716-MH-NAS01-0001-Apollo_11_Mission_Control_Center_Film_Rolls1~medium.mp4
- Local files: `public/video/mission-control.mp4`, `public/video/mission-control.jpg`
- Excerpt: 540–558 seconds. Silent, pillarboxes removed, 960px wide, 24fps.

### Section excerpts from the mission-control film

All excerpts below are silent H.264 MP4 files, 960px wide at 24fps, with a
same-named JPEG poster. Each excerpt is 16 seconds long.

| Section | Local basename | Excerpt | Editorial subject |
| --- | --- | --- | --- |
| Portfolio / Software | `software-console` | 296–312 seconds | Console hardware and technical operators |
| Portfolio / Misc | `misc-comms` | 744–760 seconds | Headset communications and coordination |
| Academic | `academic-console` | 836–852 seconds | Wide mission-operations console view |
| Academic / Research | `research-equipment` | 276–292 seconds | Equipment inspection and technical work |
| Academic / Publications | `publications-comms` | 718–734 seconds | Communications-room documentation |

### Section excerpt from the Apollo 11 launch film

| Section | Local basename | Excerpt | Editorial subject |
| --- | --- | --- | --- |
| Portfolio / Games | `games-gantry` | 54–70 seconds | Gantry activity and launch preparation |

## Engineering: Apollo lunar rover footage

- Source and credit: https://svs.gsfc.nasa.gov/10432/ — NASA/Johnson Space Center.
- Original rendition: https://svs.gsfc.nasa.gov/vis/a010000/a010400/a010432/apollo_footage_fullres.webmhd.webm
- Local files: `public/video/engineering-rover.mp4`, `public/video/engineering-rover-slow.mp4`, `public/video/engineering-rover.jpg`.
- Excerpt: 8–24 seconds of the source, showing the lunar rover in motion, without a flag. The source's black side bars are cropped (960×720 at x=160), so the footage fills the hero. The hero mirrors the clip horizontally to keep the rover visible beside the title. Silent, 24fps. The slow version uses the same motion-compensated interpolation as the other heroes at 2.5× duration (40 seconds); the poster comes from six seconds into the local excerpt.

NASA media guidance: https://www.nasa.gov/nasa-brand-center/images-and-media/

The media guidance permits NASA content on personal informational websites,
with acknowledgement and without implying endorsement. No third-party credit
was identified for these NASA archive records.
