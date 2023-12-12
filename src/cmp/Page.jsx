import styles from "./Page.module.css";
import Header from './Header';
import Feed from './Feed';

const Page = () => {
    return (
    <div className={ styles.base }>
        <Header/>
        <Feed/>
    </div>
    );
};

export default Page;