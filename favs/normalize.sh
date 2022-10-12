for f in *.ico
do
	n=`basename $f .ico`
	ffmpeg -loglevel warning -y -i $f -pix_fmt rgba -vf scale=-1:16:flags=neighbor ../icons/$n.png
done

cd ../icons

for f in *.png
do
	n=`basename $f .png`
	ffmpeg -loglevel warning -y -i $f -pix_fmt rgba -vf scale=-1:32:flags=neighbor ../icons/$n.png
done