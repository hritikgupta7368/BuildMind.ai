export const componentCategories = {
  layout: {
    label: 'Layout',
    components: {
      container: {
        type: 'container',
        label: 'Container',
        icon: '📦',
        defaultData: {
          width: 300,
          height: 200,
          backgroundColor: '#1f1f1f',
          borderRadius: 8,
          padding: 16,
          isResizable: true,
        },
      },
      section: {
        type: 'section',
        label: 'Section',
        icon: '🔲',
        defaultData: {
          width: '100%',
          minHeight: 100,
          backgroundColor: '#2d2d2d',
          padding: 16,
          isResizable: true,
        },
      },
    },
  },
  forms: {
    label: 'Forms',
    components: {
      signupForm: {
        type: 'signupForm',
        label: 'Sign Up Form',
        icon: '📝',
        defaultData: {
          width: 400,
          backgroundColor: '#1f1f1f',
          borderRadius: 8,
          padding: 24,
          isResizable: true,
          fields: [
            { type: 'text', label: 'Email', placeholder: 'Enter your email' },
            { type: 'password', label: 'Password', placeholder: 'Enter your password' },
          ],
        },
      },
      loginForm: {
        type: 'loginForm',
        label: 'Login Form',
        icon: '🔑',
        defaultData: {
          width: 400,
          backgroundColor: '#1f1f1f',
          borderRadius: 8,
          padding: 24,
          isResizable: true,
          fields: [
            { type: 'text', label: 'Username', placeholder: 'Enter username' },
            { type: 'password', label: 'Password', placeholder: 'Enter password' },
          ],
        },
      },
    },
  },
  elements: {
    label: 'Elements',
    components: {
      button: {
        type: 'button',
        label: 'Button',
        icon: '🔘',
        defaultData: {
          text: 'Click me',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          padding: '8px 16px',
          borderRadius: 6,
          fontSize: 14,
          isResizable: false,
        },
      },
      text: {
        type: 'text',
        label: 'Text',
        icon: '📄',
        defaultData: {
          content: 'Text content',
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 'normal',
          isResizable: false,
        },
      },
    },
  },
};