function App() {

    return (

        <>
            <div class="flex flex-col max-w-4xl mx-auto p-6 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-heading text-light-primary dark:text-dark-primary">Customer Support</h2>
                    <div class="text-sm text-light-secondary dark:text-dark-secondary">Available Now</div>
                </div>

                <div class="flex flex-col space-y-4 overflow-y-auto h-chat-height">
                    <div class="chat-bubble chat-bubble-user">Hi, I need assistance with my order.</div>
                    <div class="chat-bubble chat-bubble-admin">Hello! I'm here to help. What seems to be the issue?</div>
                </div>

                <div class="flex mt-4">
                    <input type="text" class="flex-1 p-2 rounded-lg border border-light-primary dark:border-dark-primary" placeholder="Type your message..." />
                    <button class="ml-2 p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Send</button>
                </div>
            </div>


            <div class="prose">
                <h1>Welcome to Tailwind CSS Typography</h1>
                <p>
                    Tailwind CSS Typography makes it easy to style long-form content. It applies
                    sensible defaults to elements like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>,
                    <code>&lt;blockquote&gt;</code>, and more.
                </p>
                <blockquote>
                    <p>“Good design is as little design as possible.”</p>
                </blockquote>
                <h2>Features</h2>
                <ul>
                    <li>Customizable typography styles</li>
                    <li>Works with dark mode</li>
                    <li>Easy to use</li>
                </ul>
            </div>


        </>



    )
}

export default App
