# TaskFlow – Task Management Dashboard

A responsive and interactive Task Management Dashboard built with HTML, CSS, and JavaScript.

## Features

### Core Components
- **Responsive Header/Navigation Bar**
  - Sticky transparent nav with logo
  - Smooth underline animation + neon glow hover
  - Profile avatar with dropdown

- **Dark/Light Mode Toggle**
  - Moon/sun icon toggle
  - Smooth animated transition
  - Saves preference in local storage

- **Task Overview Cards**
  - Four 3D glassmorphism cards with soft neon borders
  - Animated circular progress indicators
  - Hover effect: 3D tilt + glowing border

- **Interactive Kanban Task Board**
  - Columns: To Do | In Progress | Done
  - Drag & Drop functionality
  - Search and filter capabilities

- **Analytics & Reports Section**
  - Line chart (tasks completed over time)
  - Pie chart (task distribution by priority)
  - Neon glowing borders around charts

- **Calendar Integration**
  - Monthly calendar with marked due dates
  - Date selection highlighting

- **Team Collaboration Panel**
  - Horizontal scroll of team avatars
  - Online/offline indicators

- **Notifications Drawer**
  - Slide-in panel from the right
  - Smooth spring animation

- **Video Background Hero Section**
  - Muted looping productivity video
  - Overlay text with gradient effect

- **Gamification Layer**
  - XP bar showing productivity level
  - Badges for achievements
  - Confetti animation when unlocking badges

- **3D Globe Team View**
  - Interactive team location visualization
  - Glowing pins for global team members

### Design Elements
- **Theme**: Futuristic dark with glowing neon accents (cyan, purple, blue)
- **Glassmorphism**: Frosted glass effect throughout UI
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Responsive**: Fully optimized for desktop, tablet, and mobile

## Technologies Used

- **HTML5**: Semantic markup and structure
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Interactive functionality and DOM manipulation
- **Chart.js**: Data visualization for analytics
- **Font Awesome**: Icon library
- **Google Fonts**: Orbitron and Exo 2 typography

## Project Structure

```
.
├── index.html          # Main HTML file (entry point)
├── styles.css          # Custom styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Design Highlights

1. **Futuristic Aesthetic**
   - Neon color scheme with cyan, purple, and blue accents
   - Glassmorphism panels with subtle transparency
   - Glowing effects and smooth animations

2. **Responsive Layout**
   - Mobile-first approach
   - Flexible grid system
   - Adaptive components for all screen sizes

3. **Interactive Elements**
   - Drag and drop task management
   - Hover animations and transitions
   - Real-time data visualization

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd TASKFLOW
   ```

3. Serve the files locally (pick one):
   ```bash
   # Python (3.x)
   python -m http.server 8000

   # VS Code: use the Live Server extension (Right-click index.html → "Open with Live Server")

   # Node (no install):
   npx serve -l 8000 .
   ```

4. Open the browser at `http://localhost:8000`

## Deploy on Vercel

This is a static site (no build step required).

1. Push the project to a GitHub repository.
2. In Vercel, click "New Project" → Import your GitHub repo.
3. Framework Preset: "Other".
4. Build Command: Leave empty.
5. Output Directory: `/` (root).
6. Deploy.

Vercel will serve `index.html` from the repository root.

## Usage

- Toggle between dark/light mode using the sun/moon icon
- Drag and drop tasks between Kanban columns
- View analytics charts for productivity insights
- Interact with the team globe to see global locations
- Experience the gamification elements with XP and badges

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Chart.js for data visualization
- Google Fonts for typography
- Unsplash for stock imagery