Title: Clicks, Pops, Drivers and HPET - Low Latency Audio using Gigabyte EX58-UD4P
Slug: pops-clicks-drivers-hpet-low-latency-audio-discovery
Date: 2017-03-06 20:10 
Category: Audio
Tags: audio, daw, hpet, low latency audio, gigabyte
Author: Alex Hayes 
Summary: Clicks, Pops, Drivers and HPET - Low Latency Audio using Gigabyte EX58-UD4P 

This blog post explores the various things I tried to stop clicks and pops occurring while using Ableton Live (Beta 9.7.2b1) with a Push 2 on Windows 10 using a rather ancient, but still very well performing, computer. I say very well performing because in Reaper I don't have any issues. I run 64 samples buffer using my [RME Fireface 400](https://www.rme-audio.de/en/products/fireface_400.php) no problems. On some large mixes I need to bump that up a little but mostly it stays on 64 samples. My ancient computer consists of;

- [Gigabyte EX58-UD4P](http://www.gigabyte.com.au/Motherboard/GA-EX58-UD4P-rev-10#ov) mainboard.
- Intel Core i7 920 (Bloomfield).
- 6GB OCZ3G16000LV2G Ram (3x2GB sticks).
- A few various Samsung SSDs and WD Red Nas drives.
- [RME Fireface 400](https://www.rme-audio.de/en/products/fireface_400.php) (connected to the mainboard's onboard firewire 400 port).
- Various USB devices such as the Ableton Push 2, Behringer BCF2000 and an iLok.

## In the beginning

First thing I did was fire up [LatencyMon](http://www.resplendence.com/latencymon). It was telling me that USBPORT.sys and ndis.sys (Network Driver Interface Specification) both could have issues. This triggered my memory about a networking issue I had when I first upgraded to Windows 10 so I disabled networking in the bios and I thought initially that had resolved the issue, but nope, sorry mate, you've still got issues.

## These are not the drivers you're looking for

I've found that Microsoft has gotten very good at not needing drivers for lots of things. Apparently you just plug things in and just like on Linux (Ubuntu) it usually just works<sup>TM</sup>.

However, if you have a the Gigabyte EX58-UD4P mainboard on Windows 10 you hopefully have noticed that using Microsoft's default driver you have no network until you disable *Green Lan* in the bios. Disable *Green Lan* and you *should* probably have network... Awesome...

Why is this? I don't know. What I do know is that you check using Device Manager and it indeed states that you have an up to date driver.

This is unfortunately a lie and you should [download the Realtek driver](http://www.realtek.com.tw/downloads/downloadsView.aspx?Langid=1&PNid=13&PFid=5&Level=5&Conn=4&DownTypeID=3&GetDown=false). It's called *Win10 Auto Installation Program* and then you can turn *Green Lan* back on.

I initially thought this solved my clicks and popping issues but alas, the journey wasn't over yet.

## Disable USB

This was kinda hard to do. I already have my keyboard plugged into the PS/2 port so that I can get the scan codes working properly on my Microsoft Digital Media Keyboard 1.0a so that worked but I couldn't find a spare PS/2 plug for my USB mouse :(

Anyway I was able to do some basic tests (albeit not in LatencyMon because it has poor keyboard support) but it seemed like the issue was somewhat still there.

## Update Intel INF drivers

Intel's update drivers tool just didn't work. The progress bar would get to the end then it would just say 'Failed' or something along those lines. They do have log files which is a bonus but they didn't tell me much.

## Unplug USB devices

I decided to start unplugging USB devices and it seemed that unplugging the Push 2 stopped the clicks and pops in Ableton.

I thought perhaps it was the cable so I tried the one that came with the Push 2 but still had clicks and pops. Considering I don't really even know how to use Ableton and just use the Push 2 this wasn't going to work for me. I didn't pay all that money for a paper weight.

## HPET

Frustrated I went back into the BIOS looking for any odd settings that I might have missed and I noticed that under *Power Management* it had this thing called HPET and it was set to 32 bit. That's odd I thought, why would that be set to 32 bit when I'm using a 64 bit OS.

So I changed it to 64 bit and then booted up. Low and behold, that seemed to fix things.

Fired up LatencyMon and I couldn't trip it up no matter what I did on the Push 2.

I'd be keen to hear from anyone that can tell me why this *appeared* to work. I say *appeared* because I've only done limited testing, but I was able to trigger the issue extremely easily prior to switching HPET to 64 bit.
