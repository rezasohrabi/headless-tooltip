# Contributing to Headless Tooltip

Thanks for your interest in contributing! This guide will help you get started quickly.

## Quick Start

1. **Fork and clone:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/headless-tooltip.git
   cd headless-tooltip
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start development:**

   ```bash
   pnpm dev
   ```

   Opens playground at `http://localhost:3000`

## Development

### Project Structure

```text
src/
├── components/     # Tooltip and Arrow components
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

### Available Commands

- `pnpm dev` - Development playground
- `pnpm test` - Run tests
- `pnpm lint` - Check code style
- `pnpm build` - Build package
- `pnpm storybook` - Component documentation

### Making Changes

1. **Create a branch:**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and test:**

   ```bash
   pnpm test
   pnpm lint
   ```

3. **Build to verify:**

   ```bash
   pnpm build
   ```

## Testing

We use Vitest and React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../src';

test('shows tooltip on hover', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip content="Test tooltip">
      <button>Trigger</button>
    </Tooltip>
  );

  await user.hover(screen.getByRole('button'));
  expect(screen.getByText('Test tooltip')).toBeInTheDocument();
});
```

## Submitting Changes

1. **Ensure tests pass:**

   ```bash
   pnpm lint:fix
   pnpm test
   pnpm build
   ```

2. **Commit with clear messages:**

   ```bash
   git commit -m "feat: add new placement option"
   git commit -m "fix: resolve positioning issue"
   ```

3. **Push and create PR:**

   ```bash
   git push origin feature/your-feature
   ```

## Code Style

- **TypeScript** - All code must be typed
- **ESLint** - Follow configured rules
- **Prettier** - Auto-formatted on commit

### Component Example

```typescript
interface TooltipProps {
  content: React.ReactNode;
  placement?: Placement;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
}) => {
  // Implementation
};
```

## What We're Looking For

- **Bug fixes** - Issues with positioning, accessibility, or behavior
- **Performance improvements** - Reduce bundle size or improve rendering
- **Accessibility enhancements** - Better screen reader support, keyboard navigation
- **Documentation** - Code examples, API improvements
- **Tests** - Increase coverage, edge cases

## Reporting Issues

Include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Code example or CodeSandbox
- Environment (React version, browser)

## Need Help?

- Check existing [issues](https://github.com/rezasohrabi/headless-tooltip/issues)
- Open a [discussion](https://github.com/rezasohrabi/headless-tooltip/discussions)
- Email: [rezasohrab20@gmail.com](mailto:rezasohrab20@gmail.com)

---

By contributing, you agree to our [Code of Conduct](./CODE_OF_CONDUCT.md).
