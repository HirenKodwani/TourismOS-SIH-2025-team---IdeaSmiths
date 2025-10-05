import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Upload, 
  QrCode, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Smartphone,
  Shield,
  Copy,
  FileText
} from 'lucide-react';

type VerificationState = 'unregistered' | 'pending_verification' | 'verified';

interface DigitalIdentityProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
}

export function DigitalIdentity({ user }: DigitalIdentityProps) {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    user.verified ? 'verified' : 'unregistered'
  );
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null);
  const [blockchainHash, setBlockchainHash] = useState<string | null>(
    user.verified ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' : null
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  const handlePhoneVerification = () => {
    if (phoneNumber) {
      setStep(2);
      // Simulate sending SMS
      setTimeout(() => {
        alert('Verification code sent to ' + phoneNumber);
      }, 1000);
    }
  };

  const handleCodeVerification = () => {
    if (verificationCode === '123456') {
      setStep(3);
    } else {
      alert('Invalid verification code. Try 123456');
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocument(file.name);
      setVerificationState('pending_verification');
      
      // Simulate document verification process
      setTimeout(() => {
        const hash = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
        setBlockchainHash(hash);
        setVerificationState('verified');
        setStep(4);
      }, 3000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const generateQRCode = () => {
    const qrData = {
      userId: user.id,
      name: user.name,
      verified: verificationState === 'verified',
      blockchainHash: blockchainHash,
      timestamp: new Date().toISOString()
    };
    
    alert('QR Code generated with data: ' + JSON.stringify(qrData, null, 2));
  };

  if (verificationState === 'verified') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Digital Identity Verified
            </CardTitle>
            <CardDescription>
              Your digital tourist identity is verified and secured on blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tourist ID</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{user.id}</code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(user.id)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Verification Status</Label>
                <div className="mt-1">
                  <Badge variant="default">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Label>Blockchain Hash</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                    {blockchainHash}
                  </code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(blockchainHash!)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={generateQRCode} className="flex-1">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export Certificate
              </Button>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your identity is secured with blockchain technology. Share your QR code with hotels and service providers for instant verification.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl">12</div>
                <div className="text-sm text-muted-foreground">Hotel Check-ins</div>
              </div>
              <div>
                <div className="text-2xl">5</div>
                <div className="text-sm text-muted-foreground">Tour Bookings</div>
              </div>
              <div>
                <div className="text-2xl">3</div>
                <div className="text-sm text-muted-foreground">Verifications Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Digital Tourist Identity</CardTitle>
          <CardDescription>
            Verify your identity to access secure tourism services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 4 && <div className="w-16 h-0.5 bg-gray-200 mx-2" />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3>Step 1: Phone Verification</h3>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handlePhoneVerification}>
                      <Smartphone className="w-4 h-4 mr-2" />
                      Send OTP
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3>Step 2: Enter Verification Code</h3>
                <div className="space-y-2">
                  <Label htmlFor="code">6-Digit Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="code"
                      type="text"
                      placeholder="123456"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      className="flex-1"
                    />
                    <Button onClick={handleCodeVerification}>
                      Verify
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter 123456 to continue with the demo
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3>Step 3: Upload Identity Document</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2">Upload your Aadhaar Card, Passport, or Driver's License</p>
                  <p className="text-sm text-muted-foreground mb-4">JPG, PNG, or PDF up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload">
                    <Button asChild>
                      <span>
                        <FileText className="w-4 h-4 mr-2" />
                        Choose File
                      </span>
                    </Button>
                  </label>
                </div>

                {uploadedDocument && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Document "{uploadedDocument}" uploaded successfully. Processing verification...
                    </AlertDescription>
                  </Alert>
                )}

                {verificationState === 'pending_verification' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Verifying document...</span>
                      <span className="text-sm">75%</span>
                    </div>
                    <Progress value={75} className="w-full" />
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
                <h3>Identity Verified Successfully!</h3>
                <p className="text-muted-foreground">
                  Your digital tourist identity has been created and secured on blockchain.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm mb-2">Your Blockchain Hash:</p>
                  <code className="text-xs break-all">{blockchainHash}</code>
                </div>
                <Button onClick={generateQRCode} className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code for Hotels
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}