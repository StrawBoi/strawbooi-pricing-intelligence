# Contributing to Strawbooi Pricing Intelligence Platform

First off, thank you for considering contributing to Strawbooi! It's people like you that make this an amazing platform.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these `beginner` and `help-wanted` issues:

- **Beginner issues** - issues which should only require a few lines of code
- **Help wanted issues** - issues which should be a bit more involved than beginner issues

### Pull Requests

The process described here has several goals:

- Maintain code quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in the template
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all status checks are passing

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Use conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

### JavaScript/React Styleguide

- Use ES6+ features
- Use functional components with hooks
- Follow Prettier formatting
- Use descriptive variable names
- Add JSDoc comments for complex functions
- Use TypeScript types where applicable

### Python Styleguide

- Follow PEP 8
- Use type hints
- Add docstrings for all functions and classes
- Use meaningful variable names
- Maximum line length of 88 characters (Black formatter)

### CSS/Styling

- Use TailwindCSS utility classes
- Custom CSS should be minimal and well-documented
- Follow BEM methodology for custom CSS classes
- Use CSS custom properties for theming

## Development Setup

1. Fork the repo
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/strawbooi-pricing-intelligence.git`
3. Install dependencies:
   ```bash
   cd frontend && yarn install
   cd ../backend && pip install -r requirements.txt
   ```
4. Create a branch: `git checkout -b feature/amazing-feature`
5. Make your changes
6. Test your changes
7. Commit your changes: `git commit -m 'feat: add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

## Testing

- Write tests for new features
- Ensure all existing tests pass
- Add integration tests for complex features
- Test on multiple browsers and devices

## Documentation

- Update README.md if needed
- Add inline code comments
- Update API documentation
- Create user guides for new features

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Strawbooi!** 🚀

© 2025 Strawbooi. All rights reserved.