import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskModal from './TaskModal';

describe('TaskModal Component', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
    mockOnClose.mockClear();
  });

  it('should render the modal with empty fields for a new task', () => {
    render(<TaskModal onSave={mockOnSave} onClose={mockOnClose} />);
    
    // Check if "New Task" title is displayed
    expect(screen.getByText('New Task')).toBeInTheDocument();

    // Check for empty input fields
    expect(screen.getByPlaceholderText('Assigned To').value).toBe('');
    expect(screen.getByDisplayValue('Select Status')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Empty due date field
  });

  it('should render the modal with pre-filled fields for an existing task', () => {
    const mockTask = {
      assignedTo: 'John Doe',
      status: 'In Progress',
      dueDate: '2024-09-30',
      priority: 'High',
      comments: 'Task description'
    };

    render(<TaskModal task={mockTask} onSave={mockOnSave} onClose={mockOnClose} />);

    // Check if "Edit Task" title is displayed
    expect(screen.getByText('Edit Task')).toBeInTheDocument();

    // Check if the input fields have the correct values
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('In Progress')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-09-30')).toBeInTheDocument();
    expect(screen.getByDisplayValue('High')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Task description')).toBeInTheDocument();
  });

  it('should call onSave with the correct values when Save button is clicked', () => {
    render(<TaskModal onSave={mockOnSave} onClose={mockOnClose} />);
    
    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Assigned To'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByDisplayValue('Select Status'), { target: { value: 'Not Started' } });
    fireEvent.change(screen.getByPlaceholderText('Comments'), { target: { value: 'New task' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '2024-12-25' } }); // Due date
    fireEvent.change(screen.getByDisplayValue('Select Priority'), { target: { value: 'Low' } });

    // Click Save button
    fireEvent.click(screen.getByText('Save'));

    // Check if onSave was called with correct values
    expect(mockOnSave).toHaveBeenCalledWith({
      assignedTo: 'Jane Doe',
      status: 'Not Started',
      dueDate: '2024-12-25',
      priority: 'Low',
      comments: 'New task'
    });
  });

  it('should call onClose when Cancel button is clicked', () => {
    render(<TaskModal onSave={mockOnSave} onClose={mockOnClose} />);
    
    // Click Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
