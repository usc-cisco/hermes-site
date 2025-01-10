export default function Footer() {
  return (
    <footer className="text-xl bg-[#1752F0] p-6 space-y-3">
      <img
        className="w-auto h-6 mx-auto"
        src="/cisco-logo-white.png"
        alt="White transparent picture of the CISCO logo"
      />
      <p className="text-sm text-center text-white">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/usc-cisco/hermes-site"
          className="underline focus:outline-none focus:ring-1 ring-white rounded-md focus:ring-opacity-75"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hermes Site
        </a>
        <br />
        Developed by the USC Computer and Information Sciences Council. All rights reserved.
      </p>
    </footer>
  )
}
