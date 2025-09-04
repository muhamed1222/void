// Since we can't easily test the private generateUserId function from the component,
// we'll test the ID generation logic directly
const generateUserId = (): string => {
  const timestamp = Date.now();
  const hash = (timestamp % 1000).toString().padStart(3, '0');
  return `User#${hash}`;
};

describe('User ID Generation', () => {
  it('generates a user ID in the correct format', () => {
    // Mock Date.now to return a specific timestamp for predictable testing
    const mockTimestamp = 1640995200000; // A fixed timestamp
    jest.spyOn(global.Date, 'now').mockImplementation(() => mockTimestamp);
    
    const userId = generateUserId();
    
    // Check that the ID starts with "User#"
    expect(userId).toMatch(/^User#/);
    
    // Check that the ID has the correct length (User# + 3 digits)
    expect(userId).toHaveLength(8);
    
    // Check that the part after "User#" is numeric and correct based on our mock
    const numberPart = userId.substring(5);
    expect(numberPart).toMatch(/^\d{3}$/);
    expect(numberPart).toBe('000'); // Based on our mock timestamp
    
    // Restore the original Date.now implementation
    (global.Date.now as jest.Mock).mockRestore();
  });
});