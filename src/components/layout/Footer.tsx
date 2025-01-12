export default function Footer() {
  return (
    <footer className="space-y-3 bg-primary p-6 text-xl">
      <img
        className="mx-auto h-6 w-auto"
        src="/cisco-logo-white.png"
        alt="White transparent picture of the CISCO logo"
      />
      <p className="pt-1 text-center text-sm text-white">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/usc-cisco/hermes-site"
          className="rounded-md underline ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hermes Site
        </a>
      </p>
      <p className="text-center text-sm text-white">
        Developed by the USC Computer and Information Sciences Council. All rights reserved.
      </p>
    </footer>
  )
}
