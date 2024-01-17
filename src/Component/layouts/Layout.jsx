// @Author Nilanjan Dasgupta
import { Helmet } from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"

const Layout=({children,title,author,keywords,description})=>{
    return(
        <>
         <Helmet>
        <meta charset="UTF-8"/>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{ minHeight: "70vh" }}>
            {children}
        </main>
        <div><Footer/></div>
        
        </>
    )
}
Layout.defaultProps = {
    title: "Pathshala",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Nilanjan",
  };
export default Layout