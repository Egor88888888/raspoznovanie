
import { render, screen } from '@testing-library/react';
import Button from '../../../components/ui/Button';

describe('Button Component', () => {
  it('renders the button with correct text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies the correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-blue-500');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-200');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText('Danger')).toHaveClass('bg-red-500');
  });

  it('applies the correct size styles', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const button = screen.getByText('Small');
    expect(button).toHaveClass('py-1');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByText('Medium')).toHaveClass('py-2');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('py-3');
  });

  it('handles the disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });
});
