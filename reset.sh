#!/bin/bash

rm /etc/wpa_supplicant/wpa_supplicant.conf
cp /etc/wpa_supplicant/wpa_supplicant.conf.default /etc/wpa_supplicant/wpa_supplicant.conf

sed -i -e "\$anetwork={" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$assid=\"$1\"" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$apsk=\"$2\"" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$apriority=2" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$a}" /etc/wpa_supplicant/wpa_supplicant.conf

rm /etc/network/interfaces
cp /etc/network/interfaces.wifi /etc/network/interfaces
service networking restart
reboot now