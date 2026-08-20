---
title: "Self-hosting an AT Protocol PDS"
subtitle: "Running a Personal Data Server on a Raspberry Pi"
date: 2025-02-12
---
A Personal Data Server (PDS) is the host that stores your AT Protocol account data. Self-hosting one means you run that host yourself and still federate with the wider network. This note walks through a Raspberry Pi setup: hardware choices, OS compatibility, headless boot, dynamic DNS with No-IP, PDS install, and account creation.

## Why self-host

- You control where account data lives.
- You depend less on a single commercial host's uptime and policies.
- You participate in the federated model the protocol was designed for.

## Hardware, Compatibility, and Costs

### Choosing Your Raspberry Pi

For a dedicated PDS, a Raspberry Pi is a cost‑effective and power‑efficient solution. Here's what you need:

**Raspberry Pi 5**

> **Note**: The Raspberry Pi 5 is a powerful device but cannot run Ubuntu 20.04 or 22.04 — the only Ubuntu image available for the Pi 5 is Ubuntu 24.04, which is not supported by the AT Protocol PDS software. Instead, the Pi 5 runs Debian Bookworm (Raspberry Pi OS), which is fully compatible with the PDS.

**Cost Breakdown:**
- Raspberry Pi 5 (4GB): Approximately $80–$100
- Power Supply (5V/5A recommended): $10–$15
- Storage: Either a microSD card (32GB+) or a USB flash drive (8GB+); $10–$20
- Cooling (Optional): Heatsinks or a fan; around $10–$20

### Operating System Compatibility: Ubuntu vs. Raspberry Pi OS

The AT Protocol PDS software is officially supported on Ubuntu 20.04, Ubuntu 22.04, Debian 11, and Debian 12. However, there is an important compatibility detail:

**For Ubuntu Users:**
If you prefer to use Ubuntu as your operating system for the PDS, you should opt for a Raspberry Pi 4, which supports Ubuntu 20.04/22.04 and works seamlessly with the PDS installer.

**For Raspberry Pi 5 Users:**
The Raspberry Pi 5 cannot run Ubuntu 20.04/22.04. Instead, it runs Debian Bookworm (as part of Raspberry Pi OS), which is fully compatible with the AT Protocol PDS.

**In Short**: Choose a Raspberry Pi 4 if you want to use Ubuntu 20.04/22.04, or use a Raspberry Pi 5 with Raspberry Pi OS (Bookworm) for optimal compatibility.

## Booting Your Raspberry Pi: USB Flash Drive vs. microSD Card

### Booting Headlessly

To run your PDS without a monitor (i.e., headlessly), you must preconfigure your boot media. Here's how to do it:

1. **Download and Launch Raspberry Pi Imager:**
   Get the tool from the official Raspberry Pi website.

2. **Select Your Operating System:**
   For the Raspberry Pi 5, choose Raspberry Pi OS Lite (Bookworm). (Although Ubuntu images have worked in the past, Bookworm is the supported OS for the RPI5 when running the AT Protocol PDS.)

3. **Configure Advanced Options:**
   Open the advanced options (typically by pressing Ctrl + Shift + X or clicking the settings icon). Enable SSH and set your desired username and password. (For the initial setup, use Ethernet so you can skip Wi‑Fi configuration.)

4. **Write the Image:**
   Select your USB flash drive or microSD card and write the image to it.

5. **Boot Your Raspberry Pi:**
   Insert the prepared media, connect an Ethernet cable and power on your Pi. Use your router's admin panel or a network scanning tool to determine the Pi's IP address, then SSH in using the credentials you set.

This headless setup ensures that you can manage your PDS entirely via SSH without needing a microHDMI cable.

## Setting Up DNS with No‑IP

For users whose home networks do not have a static IP, a dynamic DNS (DDNS) service like No‑IP keeps your domain always updated. Here's how:

1. **Sign Up and Create a Hostname:**
   Register for a free account at No‑IP, then create a hostname (e.g., `mypds.noip.com`) that dynamically maps to your current public IP.

2. **Configure Your Domain's DNS Records:**
   In your DNS management panel (e.g., AWS Route 53), create a CNAME record for your PDS subdomain (e.g., `pds.mydomain.com`) that points to your No‑IP hostname.

3. **Set Up the No‑IP Dynamic Update Client on Your Pi:**
   Install the No‑IP client on your Raspberry Pi (e.g., `sudo apt install noip2`), then configure it with your No‑IP credentials so your public IP is automatically updated.

4. **Port Forwarding:**
   On your router, forward ports 80/tcp and 443/tcp to your Raspberry Pi's local IP address. This ensures that traffic to your domain is directed to your PDS.

With these steps, visitors to `pds.mydomain.com` will always reach your home network—even if your public IP changes.

## Installing the AT Protocol PDS

With your hardware, network, and DNS configured, it's time to install your PDS:

1. **Update Your System:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Download the Installer Script:**
   ```bash
   wget https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh
   ```

3. **Run the Installer:**
   ```bash
   sudo bash installer.sh
   ```
   This script installs Docker, Docker Compose, and deploys the PDS using Caddy as a reverse proxy. Follow any prompts during the process.

4. **Verify the Installation:**
   Open your browser and visit: `https://pds.mydomain.com/xrpc/_health`
   
   A JSON response (e.g., `{ "status": "ok" }`) indicates that your PDS is up and running.

## Setting Up an Account on Your PDS

Once your PDS is operational, you need to create an account:

1. **Create an Account via the CLI or API:**
   Using the PDS administration tool, run:
   ```bash
   sudo pdsadmin account create
   ```
   Follow the prompts to specify your desired handle, email, and password.

2. **Alternatively, Generate an Invite Code:**
   If your PDS requires an invite code, generate one by running:
   ```bash
   sudo pdsadmin create-invite-code
   ```
   Use this code during account creation through the Bluesky interface or CLI.

## Summary

A Raspberry Pi 5 on Debian Bookworm is a workable, low-power PDS host if you handle DNS and TLS correctly. The important compatibility note: Bookworm, not older Ubuntu LTS images, for current Pi 5 support in this setup. Migrating an existing Bluesky account onto a self-hosted PDS is a separate step (tools such as goat are commonly used for repository transfer).

## References

- [Raspberry Pi Imager: Official Raspberry Pi Software](https://www.raspberrypi.org/software/)
- [Debian Bookworm on Raspberry Pi: CNX Software — Raspberry Pi OS Bookworm](https://www.cnx-software.com/)
- [No‑IP Dynamic DNS: No‑IP Official Site](https://www.noip.com/)
- [AT Protocol PDS Documentation: Bluesky Social PDS GitHub](https://github.com/bluesky-social/pds)
- [Goat CLI for Account Migration: Goat CLI Repository](https://github.com/bluesky-social/goat)
- [Bluesky API Documentation: Bluesky Docs](https://docs.bsky.app/)
