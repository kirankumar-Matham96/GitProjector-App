import { githubSelector, getReadme } from "../../redux/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import { useEffect } from "react";

const Readme = ({ name }) => {
  //   if (!name) return null;
  const dispatch = useDispatch();
  const { readmeContent } = useSelector(githubSelector);

  useEffect(() => {
    dispatch(getReadme(name));
  }, [name, dispatch]);

  //   const markedText =
  //     "# Busy Buy (Redux)\n\nAn easy-to-use online store where you can shop for various products. It is a modern e-commerce platform with various features aimed at providing a seamless shopping experience.\n\n[Live app](https://busy-buy-2.vercel.app/orders)\n\n## Table of Contents\n\n- [Features](#features)\n- [Installation](#installation)\n- [Technologies Used](#technologies-used)\n- [Contributing](#contributing)\n- [License](#license)\n\n## Features\n\n- Account Management:\n\n - Sign Up & Sign In: You can create an account or log in to access personalized features.\n - Secure Access: Certain features, like checking your orders, are only available once you’re logged in.\n - User Management: Users can sign up, sign in, and log out. Authentication is handled using Firebase, ensuring secure user management.\n - Protected Routes: Certain routes, like viewing orders or the cart, are protected and require user authentication to access.\n\n- Shopping Experience:\n\n - Browse Products: Explore a wide range of items available for purchase.\n - Filter & Search: Find products by category or price to make shopping easier.\n - Product Listings: Users can browse through a list of products fetched from a mock API.\n - Categories & Filtering: Products can be filtered by category and price range, enhancing the shopping experience.\n\n- Shopping Cart:\n\n - Add & Remove Items: You can add items to your cart, adjust quantities, or remove them if you change your mind.\n - View Cart: Your cart keeps track of what you plan to buy and shows the total cost.\n\n- Order Placement:\n\n - Place Orders: When you’re ready, you can place an order directly from your cart.\n - View Past Orders: You can check your previous orders to see what you’ve bought.\n\n- User Interface:\n\n - Navigation Bar: Easily move around the site to access different sections like your cart or orders.\n - Loading & Notifications: The app lets you know when things are loading and shows messages to keep you informed.\n\n- State Management:\n\n - Global State: Redux Reducers are used to manage global states such as authentication, item, cart and order management, ensuring that state changes are efficiently handled across the app.\n\n## Installation\n\n1. Clone the repository:\n\n ```bash\n git clone https://github.com/kirankumar-Matham96/busy-buy-2.git\n\n ```\n\n2. Install the dependencies:\n\n ```bash\n npm install\n ```\n\n3. Start the app: ([see React Docs for more scripts](#react-readme-file))\n\n```bash\n npm start\n```\n\n4. Open your browser and navigate to `http://localhost:3000`\n\n## Technologies Used\n\n- ReactJS\n- react-dom\n- react-scripts\n- react-router-dom\n- react-redux\n- redux-toolkit\n- firebase\n- react-toastify\n- react-loader-spinner\n- styled-components\n\n## React Reference\n\n- [ReadMe.md](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md)\n\n## Contributing\n\nContributions are welcome! Please follow these steps:\n\n1. Fork the repository\n2. Create a new branch (`git checkout -b feature/your-feature`)\n3. Commit your changes (`git commit -m 'Add some feature'`)\n4. Push to the branch (`git push origin feature/your-feature`)\n5. Open a pull request\n\n## License\n\nThis project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.\n";

  if (!readmeContent) {
    return <p>Loading...</p>;
  }

  return (
    <ReactMarkdown className="markdown-body">{readmeContent}</ReactMarkdown>
  );
};

export default Readme;
