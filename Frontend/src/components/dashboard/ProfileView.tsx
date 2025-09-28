import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { ProfileSummary } from './ProfileSummary';
import { Edit, Save } from 'lucide-react';

export const ProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    age: '35',
    gender: 'Male',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
  });

  const handleSave = () => {
    // Simulate API call
    console.log('Profile updated:', profile);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Profile Information</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg" alt={profile.name} />
              <AvatarFallback className="bg-wellness text-wellness-foreground text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-primary">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <Input
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Age</Label>
              <Input
                name="age"
                value={profile.age}
                onChange={handleInputChange}
                readOnly={!isEditing}
                type="number"
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Gender</Label>
              <Input
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
            <div classNameName="md:col-span-2">
              <Label className="text-sm font-medium">Emergency Contact</Label>
              <Input
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-wellness">
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Summary */}
      <ProfileSummary />
    </div>
  );
};
