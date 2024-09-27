import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

// Mock the functions that will be passed as props
const mockOnConfirm = jest.fn();
const mockOnClose = jest.fn();

describe('ConfirmationModal Component', () => {
  beforeEach(() => {
    // Render the component before each test
    render(<ConfirmationModal onConfirm={mockOnConfirm} onClose={mockOnClose} />);
  });

  it('should render the confirmation message', () => {
    // Check if the confirmation message is present in the DOM
    expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
  });

  it('should call onConfirm when Yes button is clicked', () => {
    // Simulate clicking the Yes button
    fireEvent.click(screen.getByText('Yes'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1); // Check if the onConfirm function was called once
  });

  it('should call onClose when No button is clicked', () => {
    // Simulate clicking the No button
    fireEvent.click(screen.getByText('No'));
    expect(mockOnClose).toHaveBeenCalledTimes(1); // Check if the onClose function was called once
  });
});
