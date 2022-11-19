for f in *.ico; do
	n=`basename $f .ico`
	ffmpeg -loglevel warning -y -i $f -lossless 1 -vf scale=-1:16:flags=neighbor ../icons/$n.webp
done

cd ../icons

for f in *.webp; do
	n=`basename $f .webp`
	ffmpeg -loglevel warning -y -i $f -lossless 1 -vf scale=-1:32:flags=neighbor ../icons/$n.webp
done
