
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  currency: string;
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, balance, currency }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!amount || !address) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > balance) {
      toast({
        title: "رصيد غير كافي",
        description: "المبلغ المدخل أكبر من الرصيد المتاح",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "تم الإرسال بنجاح!",
        description: `تم إرسال ${amount} ${currency} إلى ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      setIsLoading(false);
      setAmount('');
      setAddress('');
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-2 border-indigo-500/40 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              إرسال {currency}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10 h-8 w-8 p-0 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-300 mb-1">الرصيد المتاح</p>
            <p className="text-2xl font-bold text-white">{balance.toFixed(4)} {currency}</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-white mb-2 block">المبلغ</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-white mb-2 block">عنوان المستقبل</Label>
              <Input
                id="address"
                placeholder="UQA..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
            </div>
          </div>

          <Button
            onClick={handleSend}
            disabled={isLoading || !amount || !address}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 text-base font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري الإرسال...
              </div>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                إرسال
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendModal;
