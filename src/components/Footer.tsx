export default function Footer() {
  return (
    <footer className="text-xl bg-[#1752F0] p-6 space-y-3">
      <img
        className="w-auto h-6 mx-auto"
        src="src/assets/cisco-logo-white.png"
        alt="White transparent picture of the CISCO logo"
      />
      <p className="text-sm text-center text-white">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/usc-cisco/hermes-site"
          className="underline"
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
