# webp version
# for f in *.ico; do
# 	n=`basename $f .ico`
# 	ffmpeg -loglevel warning -y -i $f -lossless 1 -vf scale=-1:16:flags=neighbor ../icons/$n.webp
# done

# cd ../icons

# for f in *.webp; do
# 	n=`basename $f .webp`
# 	ffmpeg -loglevel warning -y -i $f -lossless 1 -vf scale=-1:32:flags=neighbor ../icons/$n.webp
# done



# gif version
for f in *.ico; do
	n=`basename $f .ico`
	ffmpeg -loglevel warning -y -i $f -lossless 1 ../icons/$n.webp
done

cd ../icons

for f in *.webp; do
	n=`basename $f .webp`
	# im not sure but i saw some 30x30 things (https://theoldnet.com/)
	ffmpeg -loglevel warning -y -i "$f" -lavfi "palettegen=reserve_transparent=1:transparency_color=black[p];[0:v][p]paletteuse,format=rgba,scale=30:-1:flags=lanczos" "../icons/$n.gif"
	rm "$n.webp"
done