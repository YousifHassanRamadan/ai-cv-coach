import React, { useState } from "react";
import PageHeader from "../../components/common/page-header/page-header";
import type { PrivacySettings } from "../../components/feature/settings/privacy-controls-section";
import type { DataRetentionPeriod } from "../../components/feature/settings/data-retention-select";
import PrivacyControlsSection from "../../components/feature/settings/privacy-controls-section/privacy-controls-section";
import DataRetentionSection from "../../components/feature/settings/data-retention-section/data-retention-section";
import DataManagementSection from "../../components/feature/settings/data-management-section/data-management-section";
import DangerZoneSection from "../../components/feature/settings/danger-zone/danger-zone";
import EthicalAISection from "../../components/feature/settings/ethical-ai-section/ethical-ai-section";
import DeleteAccountModal from "../../components/feature/settings/delete-account-model/delete-account-model";
import Logout from "../../components/feature/settings/logout/logout";

const SettingsPage: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    biometricDataProcessing: true,
    endToEndEncryption: true,
    localProcessing: false,
  });

  const [dataRetentionPeriod, setDataRetentionPeriod] =
    useState<DataRetentionPeriod>("90 days");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const togglePrivacySetting = (key: keyof PrivacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    // Implement export logic here
  };

  const handleClearMemory = () => {
    console.log("Clearing AI memory...");
    // Implement clear memory logic here
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log("Account deleted");
    setShowDeleteModal(false);
    // Implement account deletion logic here
  };

  return (
    <div className="min-h-screen bg-bg-primary text-gray-100 p-8">
      <div className="max-w-4xl mx-auto px-6 py-5 space-y-4">
        {/* Header */}
        <PageHeader
          title="Privacy & Settings"
          subtitle="Manage your privacy preferences and data"
        />
        {/* Privacy Controls */}
        {/* <PrivacyControlsSection
          settings={privacySettings}
          onToggle={togglePrivacySetting}
        /> */}

        {/* Data Retention */}
        {/* <DataRetentionSection
          period={dataRetentionPeriod}
          onPeriodChange={setDataRetentionPeriod}
        /> */}

        {/* Data Management */}
        {/* <DataManagementSection
          onExportData={handleExportData}
          onClearMemory={handleClearMemory}
        /> */}

        {/* Danger Zone */}
        <DangerZoneSection onDeleteAccount={handleDeleteAccount} />

        {/* Ethical AI Commitment */}
        {/* <EthicalAISection /> */}

        {/* logout Account Modal */}

        <Logout />
        {/* Delete Account Modal */}
        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
