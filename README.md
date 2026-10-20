# 🌱 Lumenco — Offline Digital Learning System

**Education without internet. Learning without limits.**

Lumenco is an ESP32-powered offline digital learning system designed to make educational resources accessible in rural areas and locations with limited or no internet connectivity.

The system creates its own Wi-Fi hotspot and hosts a local website, allowing connected devices to access the learning interface without requiring an internet connection.

## ✨ Features

- 📡 **Offline Access:** Connect to the ESP32's local Wi-Fi network to access the website.
- 📚 **Student Portal:** Browse classes, subjects, and learning resources.
- 👩‍🏫 **Teacher Dashboard:** Explore the interface for managing educational content.
- 📱 **Web-Based Interface:** Access the learning platform through a browser on a connected device.
- 💾 **Local File Hosting:** Serve website files stored on the ESP32's SPIFFS filesystem.
- 🌍 **Designed for Accessibility:** A concept for supporting education in internet-limited environments.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Microcontroller | ESP32 |
| Firmware | C++ with Arduino framework |
| Embedded development | PlatformIO |
| Wireless connectivity | ESP32 Wi-Fi SoftAP |
| Web server | Arduino `WebServer` |
| DNS handling | `DNSServer` |
| File system | SPIFFS |
| Frontend | HTML, CSS, JavaScript |

## 📂 Project Structure

```text
Lumenco/
├── data/                 # Website files stored in SPIFFS
│   ├── index.html
│   ├── student-auth.html
│   ├── student-login.html
│   ├── class-select.html
│   ├── subject-select.html
│   ├── subject-resource.html
│   ├── teacher-login.html
│   ├── teacher-dashboard.html
│   ├── style.css
│   └── script.js
├── include/              # Project header files
├── lib/                  # Project libraries
├── src/
│   └── main.cpp          # ESP32 firmware
├── test/                 # Test files
├── platformio.ini        # PlatformIO configuration
├── .gitignore
└── README.md
```

## ⚙️ Hardware Requirements

- ESP32 development board
- USB data cable
- Computer with Visual Studio Code and PlatformIO
- Phone, tablet, or computer with Wi-Fi and a web browser

A battery or solar power system can be added to support portable deployment, depending on the hardware implementation.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Lumenco.git
cd Lumenco
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Open the Project

Open the project folder in Visual Studio Code with the PlatformIO extension installed.

### 3. Configure the ESP32

Check `platformio.ini` and confirm that the board and framework match your hardware.

### 4. Build and Upload the Firmware

Connect the ESP32 to your computer.

In the PlatformIO toolbar, select **Build**, then **Upload**.

### 5. Upload the Website Filesystem

The website files in `data/` must be uploaded to the ESP32's SPIFFS filesystem separately from the firmware.

Use the PlatformIO filesystem upload task supported by your installed PlatformIO setup. If your environment does not provide that task, configure the appropriate filesystem upload command before proceeding.

### 6. Connect to Lumenco

After the ESP32 starts:

1. Open the Wi-Fi settings on your phone or computer.
2. Connect to the `Lumenco-Learning` network configured in the firmware.
3. Open a browser and visit `http://192.168.4.1/`.

The configured network credentials are defined in `src/main.cpp`. Change the example credentials to your own before deployment.

## 🧪 Current Project Status

Lumenco includes an ESP32 firmware implementation for creating a local Wi-Fi access point and serving static website files, alongside a web interface for student and teacher workflows.

Some frontend actions, including authentication, content downloads, and teacher uploads, may still be demonstration-only and should not be treated as production backend features.

Hardware behavior and the complete end-to-end workflow should be verified on the target ESP32 before deployment.

## 🎯 Project Goal

Lumenco explores how low-cost embedded hardware and locally hosted web technologies can help reduce dependence on internet connectivity for accessing educational resources.

Its goal is to make digital learning more accessible in communities where reliable internet access is a challenge.

## 🔮 Future Improvements

- Real authentication and role-based access
- Actual storage and retrieval of uploaded learning materials
- Downloadable educational resources
- Interactive quizzes and progress tracking
- Expanded educational content
- Portable power integration and deployment testing

## 🤝 Contributions

Suggestions, bug reports, and contributions that improve offline learning accessibility are welcome.

## 📄 License

A license has not yet been selected. Add a suitable open-source license before inviting others to reuse or redistribute the project.
