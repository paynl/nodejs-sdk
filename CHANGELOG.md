# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [2.0.0]

### Changed
- Refactored DirectDebit to new REST API.

### Removed
- Deprecated endpoints and dependencies, see UPGRADING.md for details.

## [1.2.0]

### Added
- New order API endpoints.

### Deprecated
- All transaction endpoints, except for the status endpoint (see UPGRADING.md)

### Changed
- Package overhead maintenance (CI, linting, etc.).

### Security
- CVE-2023-28155: Updated `request` package.

## [1.1.4]

No changelog was recorded up to this release.
