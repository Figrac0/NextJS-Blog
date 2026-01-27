import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !message ||
            message.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            return;
        }

        const newMessage = {
            email,
            name,
            message,
            createdAt: new Date().toISOString(),
        };

        let client;

        const connectionString = process.env.MONGODB_URI;

        if (!connectionString) {
            res.status(500).json({
                message: "Database connection string is missing.",
            });
            return;
        }

        try {
            client = await MongoClient.connect(connectionString);
        } catch (error) {
            console.error("Could not connect to database:", error);
            res.status(500).json({ message: "Could not connect to database." });
            return;
        }

        try {
            const db = client.db("BlogMessages");

            const result = await db
                .collection("messages")
                .insertOne(newMessage);
            newMessage.id = result.insertedId;

            console.log("Message stored successfully:", newMessage.id);
        } catch (error) {
            console.error("Storing message failed:", error);
            client.close();
            res.status(500).json({ message: "Storing message failed!" });
            return;
        }

        client.close();

        res.status(201).json({
            message: "Successfully stored message!",
            data: newMessage,
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;
