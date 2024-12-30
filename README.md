# Chopchop URL

## Overview

This is a simple URL shortener application built with React and NodeJS. It allows users to manage, store, share and control their links.

## Features

- Shorten long URLs into unique and concise links.
- Customize short URLs with custom aliases (optional).
- Protect links under password.
- Limit the openings by putting a maximun of times it can be visited.
- View statistics for each shortened URL, including the number of clicks.
- Simple and intuitive user interface.

## Installation

To run the URL shortener app locally, follow these steps:

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/JavierRZR/chopchop-url.git
    ```

2. Navigate to the project directory:

    ```
    cd src
    ```

3. Install dependencies: *(it will install both backend and frontend) even if u see a lot of errors haha.*

    ```
    npm install
    ```

    *if it does not work just follow:*
    ```
    cd back-js
    npm install
    cd ../frontend
    pnpm install
    ```

4. Start the development server: *(it will start both backend and frontend)*

    ```
    npm start
    ```
    *if it does not work just follow: create 2 consoles and start one process on eachone*
    ```
    cd back-js
    npm start
    ```
    ```
    cd frontend
    pnpm run dev
    ```
    

5. Open your web browser and go to `http://localhost:5174` to access the application.

## Usage

1. **Shorten a URL**: Enter a long URL into the input field and click the "Chop" button. The app will generate a unique short URL for you.

2. **Customize Short URL (Optional)**: You can customize the generated short URL by providing a custom alias. If the alias is available, it will be used; otherwise, a random one will be generated. Also protection might be provided by using password or limit the number of visits.

3. **View Statistics**: Each shortened URL comes with a statistics page where you can view the number of clicks it has received.

## Technologies Used

- ReactJS: <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
- NodeJS: <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
- Typescript: <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
- Tailwind: <code><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/my-feature`).
6. Create a new pull request.

## License

This project is free to use, copy, modify, and whatever you want to do.

## Contact

If you have any questions or suggestions, feel free to contact me at [ruizromero98@gmail.com].
