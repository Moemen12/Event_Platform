const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-primary-50 flex-center bg-center bg-cover bg-fixed bg-dotted-pattern">
      {children}
    </div>
  );
};

export default Layout;
