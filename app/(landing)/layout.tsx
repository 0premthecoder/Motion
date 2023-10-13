import Navbar from "./_component/navbar";

const LandingLayout = ({children}:{
    children:React.ReactNode
}) => {
    return ( <div className="h-full">
        <Navbar/>
        <main className="h-full pt-40 dark:bg-[#1F1F1F]">
            {children}
        </main>
    </div>  );
}
 
export default LandingLayout;