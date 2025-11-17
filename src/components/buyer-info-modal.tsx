// import React, { useState } from 'react';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (name: string, email: string, phone: string) => void;
// }

// const BuyerInfoModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(name, email, phone);
//     onClose(); // Close the modal after submission
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay bg-gray-900 opacity-75 fixed inset-0 z-50 flex items-center justify-center">
//       <div className="modal-content bg-white rounded-lg shadow-lg px-8 py-6 text-gray-700">
//         <h2 className="text-lg font-medium mb-4">Enter your details</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Phone</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2 hover:bg-gray-400 transition duration-300">Cancel</button>
//             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BuyerInfoModal;

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from  '../components/ui/input';
import { Label } from '../components/ui/label';

interface BuyerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, phone: string) => void;
}

const BuyerInfoModal = ({ isOpen, onClose, onSubmit }: BuyerInfoModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      onSubmit(name, email, phone);
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Complete Your Purchase</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please provide your information to continue with the payment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gradient-primary">
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BuyerInfoModal;
