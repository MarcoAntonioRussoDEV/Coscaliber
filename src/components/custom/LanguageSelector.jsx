import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "flag-icons/css/flag-icons.min.css";

const languageOptions = [
    { value: "en", label: "English", countryCode: "gb" },
    { value: "it", label: "Italiano", countryCode: "it" },
    { value: "de", label: "Deutsch", countryCode: "de" },
    { value: "es", label: "Español", countryCode: "es" },
    { value: "fr", label: "Français", countryCode: "fr" },
];

const FlagIcon = ({ countryCode, className = "" }) => {
    return (
        <span
            className={cn(
                `fi fi-${countryCode} text-lg leading-none rounded-sm inline-block`,
                className
            )}
        />
    );
};

const LanguageSelector = () => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage =
        languageOptions.find(option => option.value === i18n.language) ||
        languageOptions[0];

    const handleLanguageChange = value => {
        i18n.changeLanguage(value);
    };
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <DropdownMenu
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2 rounded-full shadow-md hover:shadow-lg transition-all backdrop-blur-md"
                    >
                        <FlagIcon
                            countryCode={currentLanguage.countryCode}
                            className="w-5 h-4"
                        />
                        <span className="text-xs font-medium hidden sm:inline">
                            {currentLanguage.label}
                        </span>
                        {isOpen ? (
                            <ChevronUp className="h-4 w-4 opacity-70" />
                        ) : (
                            <ChevronDown className="h-4 w-4 opacity-70" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    side="top"
                    className="bg-background/95 backdrop-blur-md"
                >
                    <DropdownMenuLabel>
                        {t("homepage:selectLocale")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {languageOptions.map(option => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleLanguageChange(option.value)}
                            className={cn(
                                "flex items-center justify-between cursor-pointer",
                                option.value === i18n.language && "font-medium"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <FlagIcon
                                    countryCode={option.countryCode}
                                    className="w-5 h-4"
                                />
                                <span>{option.label}</span>
                            </div>
                            {option.value === i18n.language && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
