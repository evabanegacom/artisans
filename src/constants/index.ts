
export const signedInLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "#features",
    title: "Features",
  },
  // {
  //   id: "#product",
  //   title: "Product",
  // },
  // {
  //   id: "#clients",
  //   title: "Clients",
  // },

  {
    id: '/dashboard/overview',
    title: 'Dashboard'
  },

  {
    id: 'logout',
    title: 'Logout'
  },

];

const homePageLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "#features",
    title: "Features",
  },
  {
    id: "#product",
    title: "Product",
  },
  {
    id: "#clients",
    title: "Clients",
  },
  {
    id: '/login',
    title: 'Login'
  },
  {
    
  }
];

export const signedOutLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "#features",
    title: "Features",
  },
  {
    id: "#product",
    title: "Product",
  },
  // {
  //   id: "#clients",
  //   title: "Clients",
  // },

  // {
  //   id: 'signup',
  //   title: 'Sign Up'
  // },

  {
    id: '/login',
    title: 'Login'
  },

];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month: string | number = today.getMonth() + 1;
  let day: string | number = today.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
};

export const formatAsCurrency = (amount: string | number) => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) {
    return ''; // Return empty string if numericAmount is NaN
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  }).format(numericAmount);
};

export function formatDateTime(dateTimeString:string) {
  const date = new Date(dateTimeString);
  const options:any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  return date.toLocaleString('en-US', options);
}

export const logout = () => {
  localStorage.clear();
  window.location.href='/login'
}

function generateProductNumber(length:number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let productNumber = '';

  // Generate a random string
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    productNumber += charset[randomIndex];
  }

  return productNumber;
}

function isUnique(productNumber:string, existingProductNumbers:string) {
  return !existingProductNumbers.includes(productNumber);
}

function generateUniqueProductNumber(existingProductNumbers:string) {
  const maxLength = 11;
  let productNumber = generateProductNumber(maxLength);

  // Ensure uniqueness
  while (!isUnique(productNumber, existingProductNumbers)) {
    productNumber = generateProductNumber(maxLength);
  }

  return productNumber;
}

const existingProductNumbers:string[] = [];
export const uniqueProductNumber = generateUniqueProductNumber(existingProductNumbers as any);
