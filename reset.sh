#!/bin/bash

sed -i -e "\$anetwork={" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$assid=\"$1\"" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$apsk=\"$2\"" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$apriority=2" /etc/wpa_supplicant/wpa_supplicant.conf
sed -i -e "\$a}" /etc/wpa_supplicant/wpa_supplicant.conf
service networking restart
reboot now
