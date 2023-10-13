const RootLayout = (
    {children}:{
        children: React.ReactNode;
    }
    ) => {
    return ( <div className="h-full text-white bg-red-500 text-center">{children}</div>  );
}
 
export default RootLayout;