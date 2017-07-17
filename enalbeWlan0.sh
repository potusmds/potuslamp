#!/bin/bash

if ping -q -c 1 -W 1 google.com >/dev/null; then
 	echo "The network is up"
else
	echo "The network is down"
	systemctl start dhcpcd
	systemctl start dnsmasq
	cp /etc/network/interfaces.hostapd /etc/network/interfaces
	/usr/sbin/hostapd /etc/hostapd/hostapd.conf &
fi