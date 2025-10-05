import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Wallet, 
  CreditCard, 
  Smartphone, 
  Star, 
  Gift, 
  TrendingUp,
  Shield,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  History,
  Award,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface WalletPaymentsProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
}

type WalletState = 'wallet_empty' | 'transaction_pending' | 'transaction_successful' | 'rewards_available';
type PaymentMethod = 'upi' | 'card' | 'crypto' | 'cash';

export function WalletPayments({ user }: WalletPaymentsProps) {
  const [walletState, setWalletState] = useState<WalletState>('rewards_available');
  const [balance, setBalance] = useState(5420);
  const [loyaltyPoints, setLoyaltyPoints] = useState(2350);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('upi');

  const paymentMethods = [
    {
      id: 'upi1',
      type: 'upi' as PaymentMethod,
      name: 'PhonePe',
      identifier: '9876543210@phonepe',
      isDefault: true,
      logo: '📱'
    },
    {
      id: 'card1',
      type: 'card' as PaymentMethod,
      name: 'HDFC Bank',
      identifier: '**** **** **** 1234',
      isDefault: false,
      logo: '💳'
    },
    {
      id: 'crypto1',
      type: 'crypto' as PaymentMethod,
      name: 'Bitcoin Wallet',
      identifier: '1A1zP1...eP2SH',
      isDefault: false,
      logo: '₿'
    }
  ];

  const transactions = [
    {
      id: 'TXN001',
      type: 'booking',
      description: 'Hotel Booking - Grand Palace Resort',
      amount: -7650,
      status: 'completed',
      date: new Date(Date.now() - 86400000).toISOString(),
      pointsEarned: 76,
      paymentMethod: 'upi'
    },
    {
      id: 'TXN002',
      type: 'booking',
      description: 'Spice Plantation Tour',
      amount: -800,
      status: 'completed',
      date: new Date(Date.now() - 172800000).toISOString(),
      pointsEarned: 8,
      paymentMethod: 'card'
    },
    {
      id: 'TXN003',
      type: 'refund',
      description: 'Cancelled - Sunset Cruise',
      amount: 1200,
      status: 'completed',
      date: new Date(Date.now() - 259200000).toISOString(),
      pointsEarned: 0,
      paymentMethod: 'upi'
    },
    {
      id: 'TXN004',
      type: 'rewards',
      description: 'Loyalty Points Redemption',
      amount: 500,
      status: 'completed',
      date: new Date(Date.now() - 345600000).toISOString(),
      pointsEarned: -50,
      paymentMethod: 'wallet'
    }
  ];

  const rewardTiers = [
    { name: 'Explorer', minPoints: 0, maxPoints: 999, benefits: ['5% cashback', 'Priority support'] },
    { name: 'Adventurer', minPoints: 1000, maxPoints: 4999, benefits: ['10% cashback', 'Free cancellation', 'Priority booking'] },
    { name: 'Globe Trotter', minPoints: 5000, maxPoints: 9999, benefits: ['15% cashback', 'VIP treatment', 'Exclusive deals'] },
    { name: 'Legend', minPoints: 10000, maxPoints: Infinity, benefits: ['20% cashback', 'Concierge service', 'Premium perks'] }
  ];

  const getCurrentTier = () => {
    return rewardTiers.find(tier => loyaltyPoints >= tier.minPoints && loyaltyPoints <= tier.maxPoints) || rewardTiers[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    const currentIndex = rewardTiers.indexOf(currentTier);
    return currentIndex < rewardTiers.length - 1 ? rewardTiers[currentIndex + 1] : null;
  };

  const addMoney = () => {
    const amount = prompt('Enter amount to add (₹):');
    if (amount && !isNaN(Number(amount))) {
      setWalletState('transaction_pending');
      setTimeout(() => {
        setBalance(prev => prev + Number(amount));
        setWalletState('transaction_successful');
        setTimeout(() => setWalletState('rewards_available'), 2000);
      }, 2000);
    }
  };

  const redeemPoints = () => {
    if (loyaltyPoints >= 100) {
      const pointsToRedeem = Math.min(loyaltyPoints, 1000);
      const cashback = pointsToRedeem / 10; // 10 points = ₹1
      
      setLoyaltyPoints(prev => prev - pointsToRedeem);
      setBalance(prev => prev + cashback);
      alert(`Redeemed ${pointsToRedeem} points for ₹${cashback} cashback!`);
    }
  };

  const makePayment = (amount: number, description: string) => {
    if (balance >= amount) {
      setWalletState('transaction_pending');
      setTimeout(() => {
        setBalance(prev => prev - amount);
        setLoyaltyPoints(prev => prev + Math.floor(amount / 100));
        setWalletState('transaction_successful');
        setTimeout(() => setWalletState('rewards_available'), 2000);
      }, 2000);
    } else {
      alert('Insufficient balance. Please add money to your wallet.');
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'booking': return ArrowDownLeft;
      case 'refund': return ArrowUpRight;
      case 'rewards': return Gift;
      default: return History;
    }
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progressToNext = nextTier ? ((loyaltyPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-2">TourismOS Wallet</h1>
              <p className="opacity-90">Secure payments & rewards</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">₹{balance.toLocaleString()}</div>
              <div className="text-sm opacity-90">Available Balance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Status */}
      {walletState === 'transaction_pending' && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Processing your transaction... Please wait.
          </AlertDescription>
        </Alert>
      )}

      {walletState === 'transaction_successful' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Transaction completed successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={addMoney} className="h-20 flex-col space-y-2">
              <Plus className="w-6 h-6" />
              <span className="text-xs">Add Money</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <QrCode className="w-6 h-6" />
              <span className="text-xs">Scan & Pay</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ArrowUpRight className="w-6 h-6" />
              <span className="text-xs">Send Money</span>
            </Button>
            <Button onClick={redeemPoints} variant="outline" className="h-20 flex-col space-y-2">
              <Gift className="w-6 h-6" />
              <span className="text-xs">Redeem Points</span>
            </Button>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Wallet className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Wallet Balance</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{loyaltyPoints}</div>
                <div className="text-sm text-muted-foreground">Loyalty Points</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{currentTier.name}</div>
                <div className="text-sm text-muted-foreground">Current Tier</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 3).map((transaction) => {
                  const Icon = getTransactionIcon(transaction.type);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                        </p>
                        {transaction.pointsEarned !== 0 && (
                          <p className="text-xs text-muted-foreground">
                            {transaction.pointsEarned > 0 ? '+' : ''}{transaction.pointsEarned} points
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.logo}</span>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.identifier}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <Badge variant="default">Default</Badge>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Quick Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Payment</CardTitle>
              <CardDescription>Make a quick payment for services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" placeholder="Enter amount" />
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="Payment description" />
              </div>
              
              <Button className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Make Payment
              </Button>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All payments are secured with blockchain technology and encrypted end-to-end.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          {/* Current Tier Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Loyalty Program
              </CardTitle>
              <CardDescription>
                You are currently a <strong>{currentTier.name}</strong> member
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{loyaltyPoints}</div>
                <div className="text-muted-foreground">Total Points Earned</div>
              </div>

              {nextTier && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress to {nextTier.name}</span>
                    <span>{nextTier.minPoints - loyaltyPoints} points to go</span>
                  </div>
                  <Progress value={progressToNext} className="w-full" />
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-medium">Current Benefits</h4>
                <div className="space-y-2">
                  {currentTier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={redeemPoints} className="w-full">
                <Gift className="w-4 h-4 mr-2" />
                Redeem Points (100 points = ₹10)
              </Button>
            </CardContent>
          </Card>

          {/* Reward Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Tier Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rewardTiers.map((tier, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    tier === currentTier ? 'border-purple-500 bg-purple-50' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Award className={`w-5 h-5 ${tier === currentTier ? 'text-purple-600' : 'text-gray-400'}`} />
                        <h4 className="font-medium">{tier.name}</h4>
                        {tier === currentTier && (
                          <Badge variant="default">Current</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {tier.maxPoints === Infinity ? `${tier.minPoints.toLocaleString()}+ points` : `${tier.minPoints.toLocaleString()} - ${tier.maxPoints.toLocaleString()} points`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = getTransactionIcon(transaction.type);
            return (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleString()} • {transaction.id}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {transaction.paymentMethod.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                      </p>
                      {transaction.pointsEarned !== 0 && (
                        <p className="text-sm text-muted-foreground">
                          {transaction.pointsEarned > 0 ? '+' : ''}{transaction.pointsEarned} points
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}