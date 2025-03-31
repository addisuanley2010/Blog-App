
const Header = () => {


  const navs = ['home', 'posts', 'contact', 'about'];



  return (
    <div className=" text-red-600 flex gap-4 justify-end px-6 py-4">
      {navs.map(nav => (
        <h1>
          {nav}
        </h1>
      ))}
   </div>
  )
}

export default Header
