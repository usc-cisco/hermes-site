export default function Footer() {
  return (
    <footer className="mt-4 bg-primary p-6 pb-4 text-xl">
      <img
        className="mx-auto h-6 w-auto"
        src="/cisco-logo-white.png"
        alt="White transparent picture of the CISCO logo"
      />

      <p className="pt-2 text-center text-sm text-white">
        <span>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/usc-cisco/hermes-site"
            className="rounded-md underline ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Hermes
          </a>{" "}
          | An Open Source Initiative by DCISM Students & CISCO{" "}
        </span>
      </p>
    </footer>
  )
}
