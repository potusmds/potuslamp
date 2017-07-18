#!/bin/bash

if ping -q -c 1 -W 1 google.com >/dev/null; then
 	echo "The network is up"
 	service dhcpcd stop
	service dnsmasq stop
else
	echo "The network is down"
	service dhcpcd start
	service dnsmasq start
	cp /etc/network/interfaces.hostapd /etc/network/interfaces
	/usr/sbin/hostapd /etc/hostapd/hostapd.conf &
fi