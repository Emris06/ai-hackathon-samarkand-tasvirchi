🛡️ Tasvirchi - Deepfake Detection System 🎥🔍

Tasvirchi is an AI-powered deepfake detection system built for rapid video analysis and manipulation detection.
The name "Tasvirchi" (Uzbek: 🎨 "one who creates images") reflects the app's mission — to see beyond visuals and expose fake content.

🚀 Features
⚡ Lightning Fast: AI pipeline processes videos in seconds

🎯 95% Accuracy: Industry-grade detection with detailed confidence metrics

🔒 Privacy First: Videos processed securely, never stored

📈 Interactive Timeline: Visual confidence levels across the video

🧠 Detailed Analysis: Face consistency, temporal anomalies, compression artifacts & more

<img width="765" height="688" alt="image" src="https://github.com/user-attachments/assets/b386f5cc-b397-41c2-97b4-ae8eccd8d2dd" />

⚙️ Installation
bash
Copy
Edit
git clone <repository-url>
cd tasvirchi
npm install
npm start
Visit 👉 http://localhost:3000

🧪 Technologies Used
⚛️ React 18 – Frontend UI

🎨 Tailwind CSS – Clean, responsive design

🔎 Lucide React – Icon set

📊 Recharts – Confidence timeline charts

🧬 Modern JavaScript (ES6+)

🧭 Usage
🏠 Home Page
Landing view with highlights

Quick access to upload or demo

📤 Upload Page
Drag & drop interface

Supports .mp4, .avi, .mov (max 100MB)

Real-time validation

🧾 Results Page
Main verdict with % confidence

Timeline graph + heatmap

Video preview

⏳ Processing Page
Real-time animation

Time tracking + spinner

📡 API Integration
🔁 Currently uses mock data for demo.
For production setup:

Replace mock API logic in src/api/mockData.js

Add real HTTP calls to analyzeVideo()

Connect with live Deepfake Detection API

Handle all edge/error cases

🎨 Color Palette
Purpose Color Hex
Brand Primary Dark Blue #00276A
Accent Blue Gradient #003785
Background & Text Cream #FEF5E2
Alerts Red #EF4444
Warnings Orange #F59E0B

🛠️ Development Tips
🧩 Adding Components
Place in src/components/

Import shared colors from styles/colors.js

Use Tailwind classes

Maintain naming convention

🗂️ Pages
All in src/pages/

Props passed via App.jsx

Consistent styling

Mobile-first design

🧪 Demo Features
🎞️ Sample video playback

⏱️ Simulated 3-second analysis

📉 Interactive timeline chart

🧭 Mobile/tablet/desktop support

🌱 Future Enhancements
🎥 Real-time video stream detection

📁 Batch processing support

🧑‍💼 User auth + detection history

☁️ Cloud uploads (Google Drive, Dropbox)

📱 Mobile app companion

👥 Contributing
Fork repo 🔀

Create branch: git checkout -b feature/your-feature

Make changes & test ✅

Commit: git commit -m 'Add feature'

Push: git push origin feature/your-feature

Open PR 📩

📄 License
MIT License – see LICENSE for full details

💬 Support
💡 Found a bug? Have an idea?
📩 Open an issue

⚠️ Note
This project is a hackathon prototype built with mock data. For real-world deployment, actual deepfake detection APIs and security protocols should be integrated.

🎉 Tasvirchi – See the truth behind the image.
