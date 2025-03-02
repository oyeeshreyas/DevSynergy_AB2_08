import { Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="w-full bg-green-50 absolute left-0 right-0">
      <div className="w-full py-8">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black">FarmDirect</h2>
              <p className="text-sm text-gray-700">
              Farm-fresh goodness with no middlemen—just nature’s best, delivered straight from the farm to your fork!
              </p>
            </div>


            <div className="flex flex-col items-center mx-10 md:items-start">
              <h3 className="mx-10 mb-3 text-lg font-semibold text-black">Quick Links</h3>
              <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                <Link to="/" className="text-gray-700 transition-colors hover:text-orange-500">
                  Home
                </Link>
                <Link to="/search/:text" className="text-gray-700 transition-colors hover:text-orange-500">
                  Menu
                </Link>
                <Link to="/about-us" className="text-gray-700 transition-colors hover:text-orange-500">
                  About Us
                </Link>
                <Link to="/contact" className="text-gray-700 transition-colors hover:text-orange-500">
                  Contact
                </Link>

              </div>
            </div>



            <div className="flex flex-col items-center mx-10 md:items-start">
              <h3 className="mb-3 text-lg font-semibold text-black -mx-70 px-90">Contact Us</h3>
              <div className="space-y-2">
                <p className="text-gray-700">FarmDirect Headquarters</p>
                <p className="text-gray-700">123 Greenfields Lane,</p>
                <p className="text-gray-700">Agritech Park, Pune - 411001,</p>
                <p className="text-gray-700">📧 Email: support@FarmDirect.com</p>
              </div>
            </div>
          </div>


          <div className="pt-6 mt-8 border-t border-black">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex gap-6">
                <Link to="#" className="text-green-600 transition-colors hover:text-green-500">
                  <Facebook size={20} />
                </Link>
                <Link to="#" className="text-green-600 transition-colors  hover:text-green-500">
                  <Instagram size={20} />
                </Link>
                <Link to="#" className="text-green-600 transition-colors  hover:text-green-500">
                  <Twitter size={20} />
                </Link>
              </div>
              <p className="text-sm text-gray-600">© {new Date().getFullYear()} Fork Fusion. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

