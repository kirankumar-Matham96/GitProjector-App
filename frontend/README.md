# Git-Projector

## Tasks:

    1. Create app and folder structure - done
    2. Setup redux (redux-toolkit) - done
    3. Create Landing Page
    4. Create Signup & Signin pages
    5. Create Search page for git repos
    6. Create repo page

folder structure:

    gitprojector/
    │
    ├── public/                     # Public assets
    │   ├── index.html              # Main HTML file
    │   ├── favicon.ico             # Favicon
    │   └── assets/                 # Any static assets (images, icons, etc.)
    │
    ├── src/                        # Source files
    │   ├── api/                    # API service files
    │   │   ├── githubAPI.js        # GitHub API service
    │   │   └── userAPI.js          # User-related API service
    │   │
    │   ├── components/             # Reusable components
    │   │   ├── Button/             # Example Button component
    │   │   │   ├── Button.js
    │   │   │   ├── Button.css
    │   │   │   └── index.js
    │   │   ├── Header/             # Header component
    │   │   ├── Footer/             # Footer component
    │   │   └── ...                 # Other components
    │   │
    │   ├── containers/             # Container components (connected to Redux)
    │   │   ├── Home/               # Home page
    │   │   ├── Login/              # Login page
    │   │   ├── Dashboard/          # User dashboard
    │   │   └── ...                 # Other pages
    │   │
    │   ├── contexts/               # React Context API files (if applicable)
    │   │   └── AuthContext.js      # Authentication context
    │   │
    │   ├── hooks/                  # Custom hooks
    │   │   └── useAuth.js          # Hook for authentication logic
    │   │
    │   ├── pages/                  # Page components (routes)
    │   │   ├── NotFound.js         # 404 Page
    │   │   └── ...                 # Other page components
    │   │
    │   ├── redux/                  # Redux-related files
    │   │   ├── store.js            # Redux store setup
    │   │   ├── reducers/           # Reducers
    │   │   ├── actions/            # Action creators
    │   │   └── ...                 # Other Redux-related files
    │   │
    │   ├── styles/                 # Global styles
    │   │   ├── App.css             # Main styles
    │   │   └── variables.css        # CSS variables
    │   │
    │   ├── utils/                  # Utility functions and constants
    │   │   └── constants.js         # Constants for the app
    │   │
    │   ├── App.js                  # Main App component
    │   ├── index.js                # Entry point of the app
    │   └── serviceWorker.js        # Service worker (if applicable)
    │
    ├── .env                        # Environment variables
    ├── .gitignore                  # Ignored files in Git
    ├── package.json                # Project dependencies and scripts
    └── README.md                   # Project documentation
