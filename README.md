# Cypher

Cypher is an incubating core Elixpo application for private information and
account workflows. The current repository preserves the original Safe Cypher
prototype while the project is prepared for its next stage of active
development.

The existing implementation explores Firebase-backed authentication, encrypted
data storage, and role-based teacher and administrator workflows. It is
development software: do not use it to store production secrets until a
security review and supported release are published.

## Current status

- **Elixpo relationship:** core project
- **Lifecycle:** incubating
- **Support:** best effort during development
- **License:** MIT
- **Canonical record:** <https://elixpo.com/projects/cypher>

The historical demonstration may remain available at
<https://cypherpi.vercel.app>, but availability does not imply a production
service or security warranty.

## Technologies

- HTML, CSS, and JavaScript
- Firebase Authentication, Firestore, and Storage
- AES-based encryption experiments
- Python and Node.js utilities

## Prototype capabilities

### Personal information workflows

- Sign-in through Firebase Authentication
- Encrypted storage experiments for password and login records
- Session and account-management interfaces

### Teacher workflows

- Attendance capture through `scanning.py`
- Class scheduling through `teacher.js`
- Role-based access through Firebase Authentication

### Administrator workflows

- Teacher and administrator import through `upload_admins.js`
- Teacher and class management through `admin.js`
- Role-specific administrative controls

## Local development

1. Clone the canonical repository:

   ```bash
   git clone https://github.com/elixpo/cypher.git
   cd cypher
   ```

2. Install the dependencies used by the development utilities:

   ```bash
   npm install
   ```

3. Configure a development Firebase project. Never commit service-account
   credentials or production secrets.

4. Run the relevant Node.js or Python utility, or serve the browser application
   with a local static web server.

The repository does not yet publish a stable setup or release contract. The
development roadmap will replace these prototype instructions as the core
product is rebuilt.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), the
[Code of Conduct](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md) before
opening a change. Use [GitHub issues](https://github.com/elixpo/cypher/issues)
for reproducible defects and scoped proposals. Report vulnerabilities only
through the private route documented in `SECURITY.md`.

## Contributors

<a href="https://github.com/elixpo/cypher/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=elixpo/cypher" alt="Contributors to Cypher" />
</a>

Cypher retains its complete Git history and contributor attribution through the
repository rename.
