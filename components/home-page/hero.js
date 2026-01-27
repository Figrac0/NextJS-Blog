import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/cropped_main.png"
                    alt="An image showing me"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm Sergey</h1>
            <p>
                I blog about web development - especially frontend frameworks
                like Angular or React.
            </p>
        </section>
    );
}

export default Hero;
