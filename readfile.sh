#!/bin/sh

rm ssid.txt
touch ssid.txt

value="iwlist wlan0 scan"
iwlist wlan0 scan |
while read line
do
	if echo "$line" | grep 'ESSID'; then
		echo "print"
		echo "$line" >> ssid.txt
		echo "endprint"
	fi
done
chmod 777 ssid.txt 
#eval $value
