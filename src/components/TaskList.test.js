describe('TaskList Component', () => {
    it('should render the TaskList component correctly', () => {
      render(<TaskList />);
      
      // Check if the header is present
      expect(screen.getByText('Tasks')).toBeInTheDocument();
      
      // Check if the "New Task" button is present
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  
    it('should open and close TaskModal for adding a new task', () => {
      render(<TaskList />);
      
      // Open the TaskModal by clicking the "New Task" button
      fireEvent.click(screen.getByText('New Task'));
      
      // Check if the TaskModal is rendered
      expect(screen.getByTestId('mock-task-modal')).toBeInTheDocument();
      
      // Close the TaskModal
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('mock-task-modal')).not.toBeInTheDocument();
    });
  
    it('should add a new task to the list', () => {
      render(<TaskList />);
      
      // Open the TaskModal by clicking the "New Task" button
      fireEvent.click(screen.getByText('New Task'));
      
      // Simulate saving a task
      fireEvent.click(screen.getByText('Save Task'));
      
      // Check if the new task appears in the table
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
      expect(screen.getByText('2024-12-31')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
      expect(screen.getByText('Test Comment')).toBeInTheDocument();
    });
  
    it('should open and close ConfirmationModal for deleting a task', () => {
      render(<TaskList />);
      
      // First, add a task
      fireEvent.click(screen.getByText('New Task'));
      fireEvent.click(screen.getByText('Save Task'));
      
      // Open the confirmation modal by clicking "Delete" in the actions
      fireEvent.click(screen.getByText('⋮'));
      fireEvent.click(screen.getByText('Delete'));
      
      // Check if the ConfirmationModal is rendered
      expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();
      
      // Close the ConfirmationModal
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('mock-confirmation-modal')).not.toBeInTheDocument();
    });
  
    it('should delete a task from the list', () => {
      render(<TaskList />);
      
      // First, add a task
      fireEvent.click(screen.getByText('New Task'));
      fireEvent.click(screen.getByText('Save Task'));
      
      // Open the confirmation modal by clicking "Delete"
      fireEvent.click(screen.getByText('⋮'));
      fireEvent.click(screen.getByText('Delete'));
      
      // Confirm deletion
      fireEvent.click(screen.getByText('Confirm Delete'));
      
      // Check if the task is removed from the table
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
  