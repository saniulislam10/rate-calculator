"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, DollarSign, Percent, Building, TrendingUp, Briefcase, Target } from "lucide-react"
import Link from "next/link"

export default function RateCalculator() {
  const [activeTab, setActiveTab] = useState<string>("calculate-total")

  // Existing states for calculate total tab
  const [productPrice, setProductPrice] = useState<string>("200")
  const [workType, setWorkType] = useState<string>("supply")
  const [taxRate, setTaxRate] = useState<string>("15.5")
  const [officeRate, setOfficeRate] = useState<string>("15")
  const [profitRate, setProfitRate] = useState<string>("20")
  const [results, setResults] = useState<{
    total: number
    taxAmount: number
    officeAmount: number
    profitAmount: number
    totalPercentage: number
    remainingPercentage: number
  } | null>(null)

  const [totalPrice, setTotalPrice] = useState<string>("404.04")
  const [reverseWorkType, setReverseWorkType] = useState<string>("supply")
  const [reverseTaxRate, setReverseTaxRate] = useState<string>("15.5")
  const [reverseOfficeRate, setReverseOfficeRate] = useState<string>("15")
  const [reverseProfitRate, setReverseProfitRate] = useState<string>("20")
  const [reverseResults, setReverseResults] = useState<{
    productPrice: number
    taxAmount: number
    officeAmount: number
    profitAmount: number
    totalPercentage: number
    remainingPercentage: number
  } | null>(null)

  const [profitTotalPrice, setProfitTotalPrice] = useState<string>("400")
  const [profitProductPrice, setProfitProductPrice] = useState<string>("200")
  const [profitWorkType, setProfitWorkType] = useState<string>("supply")
  const [profitTaxRate, setProfitTaxRate] = useState<string>("15.5")
  const [profitOfficeRate, setProfitOfficeRate] = useState<string>("15")
  const [profitResults, setProfitResults] = useState<{
    profitAmount: number
    profitPercentage: number
    taxAmount: number
    officeAmount: number
    productPricePercentage: number
  } | null>(null)

  const handleWorkTypeChange = (value: string) => {
    setWorkType(value)
    if (value === "supply") {
      setTaxRate("15.5")
    } else if (value === "civil") {
      setTaxRate("22.5")
    }
  }

  const handleReverseWorkTypeChange = (value: string) => {
    setReverseWorkType(value)
    if (value === "supply") {
      setReverseTaxRate("15.5")
    } else if (value === "civil") {
      setReverseTaxRate("22.5")
    }
  }

  const handleProfitWorkTypeChange = (value: string) => {
    setProfitWorkType(value)
    if (value === "supply") {
      setProfitTaxRate("15.5")
    } else if (value === "civil") {
      setProfitTaxRate("22.5")
    }
  }

  const calculateRates = () => {
    const price = Number.parseFloat(productPrice) || 0
    const tax = Number.parseFloat(taxRate) || 0
    const office = Number.parseFloat(officeRate) || 0
    const profit = Number.parseFloat(profitRate) || 0

    const totalPercentage = tax + office + profit
    const remainingPercentage = 100 - totalPercentage

    if (remainingPercentage <= 0) {
      alert("Total percentage cannot be 100% or more!")
      return
    }

    const total = (price * 100) / remainingPercentage
    const taxAmount = (total * tax) / 100
    const officeAmount = (total * office) / 100
    const profitAmount = (total * profit) / 100

    setResults({
      total,
      taxAmount,
      officeAmount,
      profitAmount,
      totalPercentage,
      remainingPercentage,
    })
  }

  const calculateReverse = () => {
    const total = Number.parseFloat(totalPrice) || 0
    const tax = Number.parseFloat(reverseTaxRate) || 0
    const office = Number.parseFloat(reverseOfficeRate) || 0
    const profit = Number.parseFloat(reverseProfitRate) || 0

    const totalPercentage = tax + office + profit
    const remainingPercentage = 100 - totalPercentage

    if (remainingPercentage <= 0) {
      alert("Total percentage cannot be 100% or more!")
      return
    }

    const productPrice = (total * remainingPercentage) / 100
    const taxAmount = (total * tax) / 100
    const officeAmount = (total * office) / 100
    const profitAmount = (total * profit) / 100

    setReverseResults({
      productPrice,
      taxAmount,
      officeAmount,
      profitAmount,
      totalPercentage,
      remainingPercentage,
    })
  }

  const calculateProfit = () => {
    const total = Number.parseFloat(profitTotalPrice) || 0
    const productPrice = Number.parseFloat(profitProductPrice) || 0
    const tax = Number.parseFloat(profitTaxRate) || 0
    const office = Number.parseFloat(profitOfficeRate) || 0

    if (total <= 0 || productPrice <= 0) {
      alert("Please enter valid total and product price!")
      return
    }

    // Calculate amounts
    const taxAmount = (total * tax) / 100
    const officeAmount = (total * office) / 100

    // Calculate product price percentage
    const productPricePercentage = (productPrice * 100) / total

    // Calculate profit percentage
    const profitPercentage = 100 - tax - office - productPricePercentage

    // Calculate profit amount
    const profitAmount = (total * profitPercentage) / 100

    setProfitResults({
      profitAmount,
      profitPercentage,
      taxAmount,
      officeAmount,
      productPricePercentage,
    })
  }

  const resetCalculator = () => {
    setProductPrice("200")
    setWorkType("supply")
    setTaxRate("15.5")
    setOfficeRate("15")
    setProfitRate("20")
    setResults(null)
  }

  const resetReverseCalculator = () => {
    setTotalPrice("404.04")
    setReverseWorkType("supply")
    setReverseTaxRate("15.5")
    setReverseOfficeRate("15")
    setReverseProfitRate("20")
    setReverseResults(null)
  }

  const resetProfitCalculator = () => {
    setProfitTotalPrice("400")
    setProfitProductPrice("200")
    setProfitWorkType("supply")
    setProfitTaxRate("15.5")
    setProfitOfficeRate("15")
    setProfitResults(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Rate Calculator</h1>
          </div>
          <p className="text-muted-foreground text-balance">
            Calculate your total selling price or find the profit from given values
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculate-total" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculate Total
            </TabsTrigger>
            <TabsTrigger value="calculate-profit" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Calculate Profit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculate-total">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Calculate Total Price
                </CardTitle>
                <CardDescription>
                  Enter your product price and percentage rates to calculate the total selling price
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Type of Work
                  </Label>
                  <RadioGroup value={workType} onValueChange={handleWorkTypeChange} className="flex gap-6">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                      <RadioGroupItem
                        value="supply"
                        id="supply"
                        className="border-2 border-muted-foreground data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="supply" className="cursor-pointer font-medium">
                        Supply (Tax: 15.5%)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                      <RadioGroupItem
                        value="civil"
                        id="civil"
                        className="border-2 border-muted-foreground data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="civil" className="cursor-pointer font-medium">
                        Civil (Tax: 22.5%)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productPrice" className="text-sm font-medium">
                      Product Price (BDT)
                    </Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="Enter product price"
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate" className="text-sm font-medium flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      Tax Rate (%)
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      placeholder="15.5"
                      className="bg-input border-border"
                      readOnly={workType !== ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="officeRate" className="text-sm font-medium flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      Office Rate (%)
                    </Label>
                    <Input
                      id="officeRate"
                      type="number"
                      step="0.1"
                      value={officeRate}
                      onChange={(e) => setOfficeRate(e.target.value)}
                      placeholder="15"
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profitRate" className="text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Profit Rate (%)
                    </Label>
                    <Input
                      id="profitRate"
                      type="number"
                      step="0.1"
                      value={profitRate}
                      onChange={(e) => setProfitRate(e.target.value)}
                      placeholder="20"
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculateRates} className="flex-1">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Total
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>

                {results && (
                  <div className="mt-6 p-4 bg-card rounded-lg border">
                    <h3 className="text-lg font-semibold text-primary mb-4">Calculation Results</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background rounded border">
                          <span className="font-medium">Total Selling Price:</span>
                          <span className="text-lg font-bold text-primary">{formatCurrency(results.total)}</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm">Total Percentage:</span>
                          <span className="font-medium">{results.totalPercentage}%</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm">Remaining Percentage:</span>
                          <span className="font-medium">{results.remainingPercentage}%</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
                          <span className="text-sm">Tax Amount:</span>
                          <span className="font-medium">{formatCurrency(results.taxAmount)}</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
                          <span className="text-sm">Office Amount:</span>
                          <span className="font-medium">{formatCurrency(results.officeAmount)}</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
                          <span className="text-sm">Profit Amount:</span>
                          <span className="font-medium">{formatCurrency(results.profitAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
                      <p className="font-medium mb-1">Calculation Formula:</p>
                      <p>Total = (Product Price × 100) ÷ (100 - Total Percentage)</p>
                      <p className="text-muted-foreground mt-1">Where Total Percentage = Tax% + Office% + Profit%</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculate-profit">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Calculate Profit
                </CardTitle>
                <CardDescription>
                  Enter total selling price and product price to calculate profit amount and percentage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Type of Work
                  </Label>
                  <RadioGroup value={profitWorkType} onValueChange={handleProfitWorkTypeChange} className="flex gap-6">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                      <RadioGroupItem
                        value="supply"
                        id="profit-supply"
                        className="border-2 border-muted-foreground data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="profit-supply" className="cursor-pointer font-medium">
                        Supply (Tax: 15.5%)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                      <RadioGroupItem
                        value="civil"
                        id="profit-civil"
                        className="border-2 border-muted-foreground data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="profit-civil" className="cursor-pointer font-medium">
                        Civil (Tax: 22.5%)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profitTotalPrice" className="text-sm font-medium">
                      Total Selling Price (BDT)
                    </Label>
                    <Input
                      id="profitTotalPrice"
                      type="number"
                      value={profitTotalPrice}
                      onChange={(e) => setProfitTotalPrice(e.target.value)}
                      placeholder="Enter total selling price"
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profitProductPrice" className="text-sm font-medium">
                      Product Price (BDT)
                    </Label>
                    <Input
                      id="profitProductPrice"
                      type="number"
                      value={profitProductPrice}
                      onChange={(e) => setProfitProductPrice(e.target.value)}
                      placeholder="Enter product price"
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profitTaxRate" className="text-sm font-medium flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      Tax Rate (%)
                    </Label>
                    <Input
                      id="profitTaxRate"
                      type="number"
                      step="0.1"
                      value={profitTaxRate}
                      onChange={(e) => setProfitTaxRate(e.target.value)}
                      placeholder="15.5"
                      className="bg-input border-border"
                      readOnly={profitWorkType !== ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profitOfficeRate" className="text-sm font-medium flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      Office Rate (%)
                    </Label>
                    <Input
                      id="profitOfficeRate"
                      type="number"
                      step="0.1"
                      value={profitOfficeRate}
                      onChange={(e) => setProfitOfficeRate(e.target.value)}
                      placeholder="15"
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculateProfit} className="flex-1">
                    <Target className="h-4 w-4 mr-2" />
                    Calculate Profit
                  </Button>
                  <Button variant="outline" onClick={resetProfitCalculator}>
                    Reset
                  </Button>
                </div>

                {profitResults && (
                  <div className="mt-6 p-4 bg-card rounded-lg border">
                    <h3 className="text-lg font-semibold text-primary mb-4">Profit Calculation Results</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background rounded border">
                          <span className="font-medium">Profit Amount:</span>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(profitResults.profitAmount)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm">Profit Percentage:</span>
                          <span className="font-medium">{profitResults.profitPercentage.toFixed(2)}%</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm">Product Price Percentage:</span>
                          <span className="font-medium">{profitResults.productPricePercentage.toFixed(2)}%</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
                          <span className="text-sm">Tax Amount:</span>
                          <span className="font-medium">{formatCurrency(profitResults.taxAmount)}</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
                          <span className="text-sm">Office Amount:</span>
                          <span className="font-medium">{formatCurrency(profitResults.officeAmount)}</span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                          <span className="text-sm font-medium">Product Price:</span>
                          <span className="font-medium">{formatCurrency(Number.parseFloat(profitProductPrice))}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
                      <p className="font-medium mb-1">Calculation Formula:</p>
                      <p>Product Price % = (Product Price × 100) ÷ Total</p>
                      <p>Profit % = 100 - Tax% - Office% - Product Price%</p>
                      <p>Profit Amount = Total × Profit%</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Existing code */}
      <footer className="w-full max-w-2xl mt-8 pt-6 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}
            <a
              href="https://shajedagroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-primary/80 transition-colors ml-1"
            >
              Shajeda & Co
            </a>
            . All rights reserved. | Designed by <Link href="https://appeland.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-secondary transition-colors">Appeland</Link>  
          </p>
        </div>
      </footer>
    </div>
  )
}
