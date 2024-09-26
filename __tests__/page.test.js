// __tests__/page.test.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page'; // Adjust the path according to your structure
import { IoSchoolOutline } from "react-icons/io5";
import Link from 'next/link';

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />);

    // Check if the heading is present
    const heading = screen.getByRole('heading', { name: /welcome to learn ai/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the school icon', () => {
    render(<Home />);

    // Check if the school icon is present
    const icon = screen.getByTestId('school-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders sign-in and sign-up buttons', () => {
    render(<Home />);

    // Check if the Sign In button is present
    const signInButton = screen.getByRole('link', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/signin');

    // Check if the Sign Up button is present
    const signUpButton = screen.getByRole('link', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });
});
